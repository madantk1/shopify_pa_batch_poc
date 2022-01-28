import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box } from "grommet";
import ActionBar from "./ActionBar/ActionBar";
import Content from "./Content/Content";

import { PRODUCTS } from "../../../gql/product";
import { IPageInfo, IItemProp } from "types/item";
import { formatItems } from "utils/helper";

const MainContent: React.FC = () => {
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [items, setItems] = useState<IItemProp[]>([]);

  const { loading, data, error } = useQuery(PRODUCTS);

  useEffect(() => {
    if (!loading && data) {
      const {
        edges,
        pageInfo: { hasPreviousPage, hasNextPage },
      } = data.products;
      setPageInfo({ hasPreviousPage, hasNextPage });
      setItems(formatItems(edges));
    }
  }, [loading, data]);

  if (error) {
    console.log({ loading, data, error });
    throw error;
  }

  return (
    <Box fill round overflow="hidden" pad="small" background="#ffffff">
      <ActionBar
        items={items}
        pageInfo={pageInfo}
      />
      <Content items={items} setItems={setItems} />
    </Box>
  );
};

export default MainContent;
