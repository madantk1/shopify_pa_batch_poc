import React from 'react';
import { Grid } from 'grommet';
import Sidebar from './Sidebar/Sidebar';
import MainContent from './MainContent/MainContent';

const Batch: React.FC = () => {
  return (
    <Grid
      fill
      pad={{ vertical: 'small', left: 'small', right: 'medium' }}
      columns={['1/4', '3/4']}
      gap='small'
    >
      <Sidebar />
      <MainContent />
    </Grid>
  )
};

export default Batch;