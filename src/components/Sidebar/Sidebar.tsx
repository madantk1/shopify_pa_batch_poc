import React, { useContext } from "react";
import { Box } from "grommet";
import { BatchContext } from "context/BatchContext";
import Logo from "./Logo";
import Toolkit from "./Toolkit/Toolkit";
import EditorKit from "./EditorKit/EditorKit";
import { Actions } from "types/batch";

const Sidebar: React.FC = () => {
  const { action } = useContext(BatchContext);
  
  return (
    <Box round overflow="hidden" pad="small" background="#ffffff" width="18rem">
      <Logo />
      {action === Actions.NULL ? <Toolkit /> : <EditorKit />}
    </Box>
  );
};

export default Sidebar;
