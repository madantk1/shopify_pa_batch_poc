import { getFilename, base64ToFile } from "./helper";
import {
  IImageProp,
  TCreateStagedLocationRes,
  TUpdateProductDetailsRes,
  TImageRes,
} from "../types/item";
import { MutationFunction } from "@apollo/client";

export const createStagedLocation = (
  file: File,
  stagedUploadsCreate: Function
): TCreateStagedLocationRes =>
  stagedUploadsCreate({
    variables: {
      input: [
        {
          resource: "PRODUCT_IMAGE",
          filename: file.name,
          mimeType: file.type,
          fileSize: file.size.toString(),
          httpMethod: "POST",
        },
      ],
    },
  });

interface IParameter {
  name: string;
  value: string;
}

export const uploadFileToStaged = (
  url: string,
  parameters: IParameter[],
  file: File
) => {
  const formData = new FormData();
  parameters.forEach(({ name, value }) => {
    formData.append(name, value);
  });
  formData.append("file", file);
  return fetch(url, {
    method: "POST",
    body: formData,
  });
};

export const updateProductDetails = (
  image: IImageProp,
  url: string,
  productUpdate: Function
): TUpdateProductDetailsRes =>
  productUpdate({
    variables: {
      image: {
        id: image.id,
        src: url,
      },
      productId: image.productId,
    },
  });

export const shopifyImageUploader = async (
  imageObj: IImageProp,
  stagedUploadsCreate: MutationFunction,
  productUpdate: MutationFunction
): Promise<{ image?: TImageRes; errors?: any[]; task?: string }> => {
  // gets original image filename
  const filename = getFilename(imageObj.src);

  // converts image url to file format
  const file = await base64ToFile(imageObj.previewUrl as string, filename);

  // creates shopify location in s3 bucket
  const {
    data: {
      stagedUploadsCreate: { stagedTargets, userErrors: errors1 },
    },
  } = await createStagedLocation(file, stagedUploadsCreate);
  if (errors1.length)
    return { task: "[1/3] create S3 bucket", errors: errors1 };

  const [{ url, parameters }] = stagedTargets;
  // uploads the image to s3 bucket
  const res = await uploadFileToStaged(url, parameters, file);
  if (!res.ok) return { task: "[2/3] upload to S3 bucket", errors: [res] };

  const { value } = parameters.filter(({ name }) => name === "key")[0];
  const uploadedImgUrl = `${url}/${value}`;
  // original image url gets replaced by image url in s3 bucket
  const { data } = await updateProductDetails(
    imageObj,
    uploadedImgUrl,
    productUpdate
  );
  const {
    productImageUpdate: { image, userErrors: errors2 },
  } = data;
  if (errors2.length)
    return { task: "[3/3] update with S3 bucket url", errors: errors2 };
  return { image };
};
