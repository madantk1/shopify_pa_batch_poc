import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Box, Button } from "grommet";
import {
  getFilename,
  imgUrlToFile,
  isAnyLoading,
  updateSelectedImage,
} from "utils/helper";
import { BatchContext } from "context/BatchContext";
import { applyRemoveBg } from "utils/paHelper";
import {
  createStagedLocation,
  uploadFileToStaged,
  updateProductDetails,
} from "utils/shopifyHelper";
import {
  UPDATE_PRODUCT,
  STAGED_UPLOADS_CREATE,
} from "../../../../../gql/product";
import {
  IImageProp,
  TCreateStagedLocationRes,
  TUpdateProductDetailsRes,
} from "types/item";

interface IEditImageProps {
  onCancel: () => void;
}

const EditImage: React.FC<IEditImageProps> = (props) => {
  const { selectedItems, setSelectedItems } = useContext(BatchContext);
  const { onCancel } = props;

  const [stagedUploadsCreate] = useMutation(STAGED_UPLOADS_CREATE);
  const [productUpdate] = useMutation(UPDATE_PRODUCT);

  const imageUploader = async (image: IImageProp) => {
    // set image in loading state
    setSelectedItems((prev) =>
      updateSelectedImage(prev, { id: image.id, loading: true })
    );

    // sends image url to picsart api & gets picsart cdn url
    const { editedSrc, errorMsg } = await applyRemoveBg(image.src);
    if (errorMsg) throw errorMsg;

    if (!errorMsg) {
      // gets original image filename
      const filename = getFilename(image.src);

      // converts image url to file format
      const file = await imgUrlToFile(editedSrc, filename);

      // creates shopify location in s3 bucket
      let { data }: TCreateStagedLocationRes = await createStagedLocation(
        file,
        stagedUploadsCreate
      );
      const [{ url, parameters }] = data.stagedUploadsCreate.stagedTargets;

      // uploads the image to s3 bucket
      const response = await uploadFileToStaged(url, parameters, file);

      // original image url gets replaced by image url in s3 bucket
      if (response.ok) {
        const { value } = parameters.filter(({ name }) => name === "key")[0];
        const uploadedImgUrl = `${url}/${value}`;
        const { data }: TUpdateProductDetailsRes = await updateProductDetails(
          image,
          uploadedImgUrl,
          productUpdate
        );
        const {
          productImageUpdate: { image: uploadedImage },
        } = data;

        // set image in loaded stage
        setSelectedItems((prev) =>
          updateSelectedImage(prev, { ...uploadedImage, loading: false })
        );
      }
    }
  };

  const applyHandler = () => selectedItems.forEach(imageUploader);

  return (
    <Box fill pad="small">
      <Box fill>In progress</Box>

      <Box direction="row" justify="between">
        <Button label="Cancel" onClick={onCancel} />
        <Button
          label="Apply"
          disabled={isAnyLoading(selectedItems)}
          onClick={applyHandler}
        />
      </Box>
    </Box>
  );
};

export default EditImage;
