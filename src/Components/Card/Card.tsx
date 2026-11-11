import React, { type ReactNode } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMore from '../../icons/ExpandMore';

interface CardProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  defaultExpanded = true,
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Card;