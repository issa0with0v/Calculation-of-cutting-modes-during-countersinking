import React from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import Card from '../Card/Card';
import { blankMaterials } from '../../Dictionaries/blankMaterials';
import { useTool } from '../../context/ToolContext';

const BlankParams: React.FC = () => {
  const {
    blankMaterial,
    setBlankMaterial,
    hardness,
    setHardness,
    strength,
    setStrength,
    length,
    setLength,
    coolant,
    setCoolant,
  } = useTool();

  return (
    <Card title="Параметры заготовки">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Autocomplete
          options={blankMaterials}
          getOptionLabel={(option) => option.label}
          value={blankMaterial}
          onChange={(_e, value) => setBlankMaterial(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <span>
                  Материал <span style={{ color: 'red' }}>*</span>
                </span>
              }
              size="small"
              fullWidth
            />
          )}
        />

        <TextField
          label={
            <span>
              Твёрдость HB <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="number"
          size="small"
          fullWidth
          value={hardness || ''}
          onChange={(e) => setHardness(Number(e.target.value))}
        />

        <TextField
          label={
            <span>
              Предел прочности σв, МПа <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="number"
          size="small"
          fullWidth
          value={strength || ''}
          onChange={(e) => setStrength(Number(e.target.value))}
        />

        <TextField
          label={
            <span>
              Длина обработки, мм <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="number"
          size="small"
          fullWidth
          value={length || ''}
          onChange={(e) => setLength(Number(e.target.value))}
        />

        <FormControlLabel
          control={
            <Switch
              checked={coolant}
              onChange={(e) => setCoolant(e.target.checked)}
            />
          }
          label="Охлаждение (СОЖ)"
        />
      </Box>
    </Card>
  );
};

export default BlankParams;