import React from "react";
import { Carousel } from "grommet";
import { IItemProp } from "../../../types/item";
import ImageContainer from "./ImageContainer";

const ImageCarousel: React.FC<IItemProp> = (props) => {
  return (
    <Carousel alignSelf="center" fill>
      {props?.images?.map((item) => (
        <ImageContainer key={item?.id} image={item} />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
