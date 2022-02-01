import React from 'react';
import { Box } from 'grommet';
import Sidebar from './Sidebar/Sidebar';
import MainContent from './MainContent/MainContent';

const Batch: React.FC = () => {
  return (
    <Box
      fill
      direction="row"
      pad={{ vertical: 'small', left: 'small', right: 'medium' }}
      gap='small'
    >
      <Sidebar />
      <MainContent />
    </Box>
  )
};

export default Batch;