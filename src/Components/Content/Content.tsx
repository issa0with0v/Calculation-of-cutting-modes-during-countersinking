import React from 'react';
import { Box } from '@mui/material';
import useStyles from './useStyles';

import BlankParams from '../BlankParams/BlankParams';
import MachineParams from '../MachineParams/MachineParams';
import ToolParams from '../ToolParams/ToolParams';
import ToolImage from '../ToolImage/ToolImage';
import ToolManager from '../ToolManager/ToolManager';
import ProcessingParams from '../ProcessingParams/ProcessingParams';
import Results from '../Results/Results';

const Content: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {/* Left column */}
      <Box className={classes.leftColumn}>
        <BlankParams />
        <MachineParams />
        <ToolParams />
      </Box>

      {/* Middle column */}
      <Box className={classes.middleColumn}>
        <ToolImage />
        <ProcessingParams />
      </Box>

      {/* Right column */}
      <Box className={classes.rightColumn}>
        <Results />
        <ToolManager />
      </Box>
    </Box>
  );
};

export default Content;