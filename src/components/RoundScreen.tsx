import React from 'react';
import { Typography, Box } from '@mui/material';

interface RoundScreenProps {
  roundTitle: string;
}

const RoundScreen: React.FC<RoundScreenProps> = ({ roundTitle }) => {
  return (
    <Box className="round-screen" display="flex" justifyContent="center">
      <Typography variant="h4" component="h2">
        {roundTitle}
      </Typography>
    </Box>
  );
};

export default RoundScreen;


