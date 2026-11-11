import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Card from '../Card/Card';
import { useTool } from '../../context/ToolContext';

const processingTypes = [
  { id: 'rough', label: 'Черновое зенкерование' },
  { id: 'finish', label: 'Чистовое зенкерование' },
];

const roughnessOptions = [
  { id: 'ra12.5', label: 'Ra 12,5' },
  { id: 'ra6.3', label: 'Ra 6,3' },
  { id: 'ra3.2', label: 'Ra 3,2' },
  { id: 'ra1.6', label: 'Ra 1,6' },
];

const ProcessingParams: React.FC = () => {
  const { depth, setDepth } = useTool();

  const preventMinus = (e: React.KeyboardEvent) => {
    if (e.key === '-') e.preventDefault();
  };

  return (
    <Card title="Параметры обработки">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Autocomplete
          options={processingTypes}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Тип зенкерования" size="small" fullWidth />
          )}
        />

        <TextField
          label={
            <span>
              Глубина резания t, мм <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="number"
          size="small"
          fullWidth
          value={depth || ''}
          onChange={(e) => setDepth(Number(e.target.value))}
          onKeyDown={preventMinus}
        />

        <Autocomplete
          options={roughnessOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Шероховатость Ra, мкм" size="small" fullWidth />
          )}
        />

        <TextField
          label="Операция"
          size="small"
          fullWidth
        />
      </Box>
    </Card>
  );
};

export default ProcessingParams;