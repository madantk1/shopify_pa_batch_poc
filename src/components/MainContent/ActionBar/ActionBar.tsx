import React, { useContext } from "react";
import { Box, Button, CheckBox } from "grommet";
import { BatchContext } from "context/BatchContext";
import { selectAll, isAllSelected } from "utils/helper";
import { IItemProp, IPageInfo } from "types/item";
import { Actions } from "types/batch";

interface IActionBarProps {
  items: IItemProp[];
  pageInfo: IPageInfo;
}

const ActionBar: React.FC<IActionBarProps> = (props) => {
  const { items, pageInfo } = props;
  const { action, selectedItems, setSelectedItems } = useContext(BatchContext);

  const selectAllHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = ({
    target: { checked },
  }) => {
    const selected = checked ? selectAll(items) : [];
    setSelectedItems(selected);
  };

  return (
    <Box
      direction="row"
      justify="between"
      height="xxsmall"
      margin={{ bottom: "xsmall" }}
    >
      {action === Actions.NULL && (
        <CheckBox
          label="Select All"
          checked={isAllSelected(items, selectedItems)}
          onChange={selectAllHandler}
        />
      )}

      {action === Actions.NULL && (
        <Box direction="row" justify="between" width="small">
          <Button label="Prev" disabled={!pageInfo.hasPreviousPage} />
          <Button label="Next" disabled={!pageInfo.hasNextPage} />
        </Box>
      )}
    </Box>
  );
};

export default ActionBar;
