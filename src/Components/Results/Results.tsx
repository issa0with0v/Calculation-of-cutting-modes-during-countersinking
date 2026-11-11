import React from 'react';
import { Box, Button, Typography, Divider, Stack } from '@mui/material';
import Card from '../Card/Card';
import { useTool } from '../../context/ToolContext';

const Results: React.FC = () => {
  const { result, calculate } = useTool();

  const Item = ({ label, value, unit }: { label: string; value: number | string; unit: string }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 0.8,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value} <Typography component="span" variant="body2" color="text.secondary">{unit}</Typography>
      </Typography>
    </Box>
  );

  return (
    <Card title="Результаты расчёта">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={calculate}
          fullWidth
          sx={{ py: 1.3, fontWeight: 600 }}
        >
          РАССЧИТАТЬ
        </Button>

        {result ? (
          <Box
            sx={{
              backgroundColor: '#f8fafc',
              borderRadius: 2,
              p: 2,
              border: '1px solid #e2e8f0',
            }}
          >
            <Stack spacing={0.5}>
              <Item label="Скорость резания V" value={result.V} unit="м/мин" />
              <Divider />
              <Item label="Подача S" value={result.S} unit="мм/об" />
              <Divider />
              <Item label="Частота вращения n" value={result.n} unit="об/мин" />
              <Divider />
              <Item label="Сила резания Pz" value={result.Pz} unit="Н" />
              <Divider />
              <Item label="Мощность N" value={result.N} unit="кВт" />
              <Divider />
              <Item label="Основное время To" value={result.To} unit="мин" />
            </Stack>
          </Box>
        ) : (
          <Typography
            color="text.secondary"
            align="center"
            sx={{ py: 3 }}
          >
            Нажмите «Рассчитать» для получения результатов
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default Results;