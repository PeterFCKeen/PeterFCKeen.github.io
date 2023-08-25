import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Activity } from '../types';

interface HomeProps {
  activities: Activity[];
  onSelectActivity: (index: number) => void;
}

const Home: React.FC<HomeProps> = ({ activities, onSelectActivity }) => {
  return (
    <Box className="activity-menu" display="flex" flexDirection="column" alignItems="center">
      <Typography component="h1" variant="h5" marginBottom={2}>Error Find</Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {activities.map((activity, index) => (
          <Box key={index} marginBottom={1}>
            <Button variant="outlined" onClick={() => onSelectActivity(index)}>
              {activity.activity_name}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
