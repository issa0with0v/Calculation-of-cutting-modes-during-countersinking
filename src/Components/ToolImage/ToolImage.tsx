import React from 'react';
import { Box } from '@mui/material';
import Card from '../Card/Card';
import { useTool } from '../../context/ToolContext';

const ToolImage: React.FC = () => {
  const { selectedToolType } = useTool();

  const imageSrc = selectedToolType?.image || '/images/tools/cylindrical.png';

  return (
    <Card title="Пример режущего инструмента">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          minHeight: 260,
        }}
      >
        <img
          src={imageSrc}
          alt={selectedToolType?.label || 'Зенкер'}
          style={{
            width: 240,
            height: 240,
            objectFit: 'contain',
          }}
        />
      </Box>
    </Card>
  );
};

export default ToolImage;