import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Card from '../Card/Card';
import { machines, type Machine } from '../../Dictionaries/machines';

const MachineParams: React.FC = () => {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const handleMachineChange = (
    _event: React.SyntheticEvent,
    value: Machine | null
  ) => {
    setSelectedMachine(value);
    console.log('Выбран станок:', value);
  };

  return (
    <Card title="Параметры станка">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Autocomplete
          options={machines}
          getOptionLabel={(option) => option.label}
          value={selectedMachine}
          onChange={handleMachineChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Станок"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />

        {selectedMachine && (
          <>
            <TextField
              label="Мощность, кВт"
              value={selectedMachine.power}
              size="small"
              fullWidth
              slotProps={{
                input: { readOnly: true },
              }}
            />
            <TextField
              label="Макс. частота вращения, об/мин"
              value={selectedMachine.maxRpm}
              size="small"
              fullWidth
              slotProps={{
                input: { readOnly: true },
              }}
            />
          </>
        )}
      </Box>
    </Card>
  );
};

export default MachineParams;