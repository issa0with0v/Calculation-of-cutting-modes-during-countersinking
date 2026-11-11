import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Card from '../Card/Card';
import { toolTypes, toolMaterials } from '../../Dictionaries/tools';
import { useTool } from '../../context/ToolContext';

const ToolParams: React.FC = () => {
  const {
    selectedToolType,
    setSelectedToolType,
    diameter,
    setDiameter,
    teeth,
    setTeeth,
    material,
    setMaterial,
  } = useTool();

  const preventMinus = (e: React.KeyboardEvent) => {
    if (e.key === '-') e.preventDefault();
  };

  return (
    <Card title="Параметры зенкера">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Autocomplete
          options={toolTypes}
          getOptionLabel={(option) => option.label}
          value={selectedToolType}
          onChange={(_e, value) => setSelectedToolType(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Тип зенкера"
              size="small"
              fullWidth
            />
          )}
        />

        <Autocomplete
          options={toolMaterials}
          getOptionLabel={(option) => option.label}
          value={toolMaterials.find((m) => m.label === material) || null}
          onChange={(_e, value) => setMaterial(value?.label || 'Р6М5')}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Материал режущей части"
              size="small"
              fullWidth
            />
          )}
        />

        <TextField
          label={
            <span>
              Диаметр зенкера, мм <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="number"
          size="small"
          fullWidth
          value={diameter || ''}
          onChange={(e) => setDiameter(Number(e.target.value))}
          onKeyDown={preventMinus}
        />

        <TextField
          label={
            <span>
              Число зубьев <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="number"
          size="small"
          fullWidth
          value={teeth || ''}
          onChange={(e) => setTeeth(Number(e.target.value))}
          onKeyDown={preventMinus}
        />
      </Box>
    </Card>
  );
};

export default ToolParams;