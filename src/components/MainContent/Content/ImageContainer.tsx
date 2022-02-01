import React, { useContext, useRef } from "react";
import { Box, CheckBox, Image, Layer, Spinner } from "grommet";
import { IImageProp } from "../../../types/item";
import { BatchContext } from "context/BatchContext";
import { isSelected } from "utils/helper";
import { Actions } from "types/batch";

interface ImageContainerProp {
  image: IImageProp;
}

const ImageContainer: React.FC<ImageContainerProp> = (props) => {
  const { image } = props;
  const { selectedItems, setSelectedItems, action } = useContext(BatchContext);
  const imageContainerRef = useRef<HTMLImageElement>();

  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setSelectedItems((prev: IImageProp[]) =>
      checked ? [...prev, image] : prev.filter((item) => item.id !== image.id)
    );
  };

  return (
    <Box fill>
      {action === Actions.NULL && (
        <CheckBox
          pad={{ top: "small", left: "medium" }}
          checked={isSelected(image, selectedItems)}
          onChange={selectHandler}
        />
      )}
      <Image
      style={{background: "transparent"}}
        ref={imageContainerRef}
        src={image.previewUrl ?? image.src}
        fit="contain"
        loading="lazy"
      />
      {image.loading && (
        <Layer target={imageContainerRef.current} >
          <Spinner size="medium" />
        </Layer>
      )}
    </Box>
  );
};

export default ImageContainer;
