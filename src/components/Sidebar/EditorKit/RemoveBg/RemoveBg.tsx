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
  shopifyImageUploader,
} from "utils/shopifyHelper";
import {
  UPDATE_PRODUCT,
  STAGED_UPLOADS_CREATE,
} from "../../../../../gql/product";
import { IImageProp } from "types/item";

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
    const { imageUrl, error } = await applyRemoveBg(image.src);
    if (error) throw error;

    // uploads image to shopify
    const { image: uploadedImage, errors } = await shopifyImageUploader(
      image,
      imageUrl,
      stagedUploadsCreate,
      productUpdate
    );
    if (errors?.length) throw errors;

    // set image in loaded stage
    setSelectedItems((prev) =>
      updateSelectedImage(
        prev,
        uploadedImage
          ? { ...uploadedImage, loading: false }
          : { loading: false }
      )
    );
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
