import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Quiz from './Quiz';
import Home from './Home';
import { Activity } from '../types';
import { Box } from '@mui/material';
import { fetchData } from '../api/english-quiz';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as dotenv from 'dotenv';
dotenv.config();

interface AppData {
  activities: Activity[];
  name: string;
}

function App() {
  const [currentActivity, setCurrentActivity] = useState<number | null>(0);
  const [data, setData] = useState<AppData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean | null>(true);

  const navigate = useNavigate(); 

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then(result => {
        setData({
          activities: result.activities,
          name: result.name,
        });

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectActivity = (index: number) => {
    setCurrentActivity(index);
    navigate(`/quiz/`);
  };

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Box
      className="App"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={4}
      width="320px"
      border="1px solid lightblue"
      margin="0 auto"
      padding="20px"
      minHeight="600px"
    >
      <Routes>
        <Route path="/" element={<Home onSelectActivity={handleSelectActivity} activities={data?.activities || []} />} />
        {data?.activities && (
          <Route
            path="/quiz"
            element={<Quiz activity={data?.activities[currentActivity || 0]} />}
          />
        )}      
      </Routes>
    </Box>
  );
}

export default App;
