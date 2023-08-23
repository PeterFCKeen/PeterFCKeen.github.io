import React, { useState, useEffect } from 'react';
import ActivityMenu from './ActivityMenu';
import Quiz from './Quiz';
import { Activity } from './types';

interface AppData {
  activities: Activity[];
  name: string;
}

function App() {
  const [currentActivity, setCurrentActivity] = useState<number | null>(null);
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    fetch('http://172.27.27.82:8001/proxy/interview.mock.data/payload.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  return (
    <div className="App">
      {data ? (
        currentActivity === null ? (
          <ActivityMenu onSelectActivity={setCurrentActivity} activities={data.activities} />
        ) : (
          <Quiz activity={data.activities[currentActivity]} />
        )
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
