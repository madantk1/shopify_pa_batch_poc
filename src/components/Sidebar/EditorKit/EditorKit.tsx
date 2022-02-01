import React, { useContext } from "react";
import { BatchContext } from "context/BatchContext";
import { Actions } from "../../../types/batch";
import EditBackground from "./EditBackground/EditBackground";

const EditorKit: React.FC = () => {
  const { action, setAction } = useContext(BatchContext);

  const toggleView: () => void = () => setAction(Actions.NULL);

  return (
    <>
      {action === Actions.EDIT_BACKGROUND && <EditBackground onCancel={toggleView} />}
    </>
  );
};

export default EditorKit;
