import React, { useContext } from "react";
import { Box, Grid, ResponsiveContext } from "grommet";
import { BatchContext } from "context/BatchContext";
import ImageCarousel from "./ImageCarousel";
import ImageContainer from "./ImageContainer";
import { IItemProp } from "types/item";
import { Actions } from "types/batch";

interface IContentProps {
  items: IItemProp[];
  setItems: Function;
}

const Content: React.FC<IContentProps> = (props) => {
  const { items } = props;
  const { action, selectedItems } = useContext(BatchContext);
  const size = useContext(ResponsiveContext);

  const getColumnWidth = () => {
    if (size === "large") return '1/4';
    if (size === "medium") return '1/3';
    if (size === 'small') return '1/2';
  }

  const getCarouselView = () =>
    items?.map((item) => (
      <Box
        fill
        key={item?.productId}
        round
        overflow="hidden"
        background="#f4f5f8"
      >
        <ImageCarousel {...item} />
      </Box>
    ));

  const getImageView = () => {
    return selectedItems?.map((item) => (
      <Box fill key={item?.id} round overflow="hidden" background="#f4f5f8">
        <ImageContainer image={item} />
      </Box>
    ));
  };

  return (
    <Box fill pad="small" overflow="auto">
      <Grid rows="medium" columns={getColumnWidth()} gap="small">
        {action === Actions.NULL ? getCarouselView() : getImageView()}
      </Grid>
    </Box>
  );
};

export default Content;
