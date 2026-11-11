import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useTool } from '../../context/ToolContext';

const Header: React.FC = () => {
  const { saveCalculation, loadCalculation, resetAll } = useTool();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Расчет режимов резания при зенкеровании
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={loadCalculation}>
            Открыть расчет
          </Button>
          <Button color="inherit" onClick={saveCalculation}>
            Сохранить расчет
          </Button>
          <Button color="inherit" onClick={resetAll}>
            Сбросить
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;