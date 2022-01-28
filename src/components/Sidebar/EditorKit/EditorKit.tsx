import React, { useContext } from "react";
import { BatchContext } from "context/BatchContext";
import { Actions } from "../../../types/batch";
import RemoveBg from "./RemoveBg/RemoveBg";

const EditorKit: React.FC = () => {
  const { action, setAction } = useContext(BatchContext);

  const toggleView: () => void = () => setAction(Actions.NULL);

  return (
    <>
      {action === Actions.EDIT_BACKGROUND && <RemoveBg onCancel={toggleView} />}
    </>
  );
};

export default EditorKit;
