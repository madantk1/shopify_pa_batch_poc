import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Box, Button, Text } from "grommet";
import RemoveBg from "./RemoveBg";
import { BatchContext } from "context/BatchContext";
import { isAnyLoading, isAnyPreview, updateItem } from "utils/helper";
import { shopifyImageUploader } from "utils/shopifyHelper";
import {
  UPDATE_PRODUCT,
  STAGED_UPLOADS_CREATE,
} from "../../../../../gql/product";
import { IImageProp } from "types/item";

interface IEditBackgroundProps {
  onCancel: () => void;
}

const EditBackground: React.FC<IEditBackgroundProps> = (props) => {
  const { selectedItems, setSelectedItems } = useContext(BatchContext);
  const { onCancel } = props;

  const [stagedUploadsCreate] = useMutation(STAGED_UPLOADS_CREATE);
  const [productUpdate] = useMutation(UPDATE_PRODUCT);

  const revertHandler = () =>
    setSelectedItems((prev) =>
      prev.map((image) => ({ ...image, previewUrl: undefined, loading: false }))
    );

  const uploader = async (image: IImageProp) => {
    updateItem({ ...image, loading: true }, setSelectedItems);
    const {
      image: uploadedImage,
      errors,
      task,
    } = await shopifyImageUploader(image, stagedUploadsCreate, productUpdate);
    if (errors?.length) {
      updateItem({ previewUrl: undefined, loading: false }, setSelectedItems);
      const err = new Error(errors[0]);
      err.name = task as string;
      throw err;
    }
    updateItem(
      { ...uploadedImage, previewUrl: undefined, loading: false },
      setSelectedItems
    );
  };

  const applyHandler = () => selectedItems.forEach(uploader);

  return (
    <Box fill pad="small" gap="small">
      <Box fill gap="xsmall">
        <RemoveBg />
        <Button
          label={<Text size="small">Revert edits</Text>}
          disabled={!isAnyPreview(selectedItems)}
          onClick={revertHandler}
        />
      </Box>

      <Box direction="row" justify="around" gap="xsmall">
        <Button label={<Text size="small">Cancel</Text>} onClick={onCancel} />
        <Button
          label={<Text size="small">Upload</Text>}
          disabled={isAnyLoading(selectedItems) || !isAnyPreview(selectedItems)}
          onClick={applyHandler}
        />
      </Box>
    </Box>
  );
};

export default EditBackground;
