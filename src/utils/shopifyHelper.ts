import { getFilename, imgUrlToFile } from "./helper";
import { IImageProp } from "../types/item";


export const createStagedLocation = (
  file: File,
  stagedUploadsCreate: Function
) => {
  return stagedUploadsCreate({
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
};

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
) => {
  return productUpdate({
    variables: {
      image: {
        id: image.id,
        src: url,
      },
      productId: image.productId,
    },
  });
};
