import React, { useContext } from "react";
import { Box, Button, Text } from "grommet";
import { BatchContext } from "context/BatchContext";
import { Actions } from "types/batch";

const actions = Object.entries(Actions).filter(
  ([_, val]) => val !== Actions.NULL
);

interface IActionButton {
  action: Actions;
  isDisabled?: boolean;
}

const ActionButton: React.FC<IActionButton> = ({
  action,
  isDisabled = false,
}) => {
  const { setAction, selectedItems } = useContext(BatchContext);
  return (
    <Button
      label={<Text size="small">{action}</Text>}
      disabled={!selectedItems.length || isDisabled}
      onClick={() => setAction(action)}
    />
  );
};

const Toolkit: React.FC = () => {
  return (
    <Box fill pad="small" gap="small">
      <ActionButton action={Actions.UPSCALE} isDisabled={true} />
      <ActionButton action={Actions.EDIT_BACKGROUND} />
      <ActionButton action={Actions.RESIZE} isDisabled={true} />
      <ActionButton action={Actions.CROP} isDisabled={true} />
      <ActionButton action={Actions.WATERMARK_CREATOR} isDisabled={true} />
    </Box>
  );
};

export default Toolkit;
