import React, { useContext } from "react";
import { Button, Text } from "grommet";
import { BatchContext } from "context/BatchContext";
import { updateItem, imgUrlToBlob, blobToBase64 } from "utils/helper";
import { applyRemoveBg } from "utils/paHelper";
import { IImageProp } from "types/item";

const RemoveBg: React.FC = () => {
  const { selectedItems, setSelectedItems } = useContext(BatchContext);

  const removeBg = async (item: IImageProp) => {
    const { id, src } = item;
    updateItem({ id, loading: true }, setSelectedItems);
    const { imageUrl, error } = await applyRemoveBg(src);
    if (error) {
      updateItem({ id, loading: false }, setSelectedItems);
      const err = new Error(error)
      err.name = "removeBg";
      throw err;
    }
    console.log(imageUrl);
    const blob = await imgUrlToBlob(imageUrl);
    console.log(blob);
    const base64 = await blobToBase64(blob);
    console.log(base64);
    updateItem({ id, previewUrl: base64, loading: false }, setSelectedItems);
  };

  const clickHandler = () => selectedItems.forEach(removeBg);

  return (
    <Button
      label={<Text size="small">Remove Background</Text>}
      onClick={clickHandler}
    />
  );
};

export default RemoveBg;
