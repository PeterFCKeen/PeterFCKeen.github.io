import React, { useState, useEffect } from 'react';
import { Activity, RoundData } from '../types';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';

interface ResultsPageProps {
  userAnswers: boolean[];
  activity: Activity;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ userAnswers, activity }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const hasRounds = activity.questions.some((roundOrQuestion) => 'questions' in roundOrQuestion);

  const generateQuestionResultText = (questionIndex: number, isCorrect: boolean) => {
    const questionNumber = questionIndex + 1;
    const answerText = isCorrect ? 'Correct' : 'False';
    return `Question ${questionNumber} ${answerText}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box className="results-page" display="flex" flexDirection="column" alignItems="center" marginTop={4}>
      <Typography variant="h4">Results</Typography>

      {hasRounds ? (
        <React.Fragment>
          <Typography variant="h5" align="center">{ activity.activity_name } - Results Breakdown Per Round</Typography>
          <Paper elevation={3}>
            {activity.questions.map((roundOrQuestion, roundIndex) => {
              if ('questions' in roundOrQuestion) {
                const round = roundOrQuestion as RoundData;
                const startIndex = activity.questions
                  .slice(0, roundIndex)
                  .reduce((sum, curRoundOrQuestion) =>
                    'questions' in curRoundOrQuestion ? sum + curRoundOrQuestion.questions.length : sum,
                    0
                  );

                return (
                  <Box key={roundIndex} className="round-results" marginTop={2} padding={2}>
                    <Typography variant="h6">{`Round ${roundIndex + 1}`}</Typography>
                    {round.questions.map((_, questionIndex) => (
                      <Typography key={questionIndex}>
                        {generateQuestionResultText(
                          startIndex + questionIndex,
                          userAnswers[startIndex + questionIndex]
                        )}
                      </Typography>
                    ))}
                  </Box>
                );
              }
              return null;
            })}
          </Paper>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="h5" align="center">Results for { activity.activity_name }.</Typography>
          <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
            {activity.questions.map((_, questionIndex) => (
              <Typography key={questionIndex}>
                {generateQuestionResultText(questionIndex, userAnswers[questionIndex])}
              </Typography>
            ))}
          </Paper>
        </React.Fragment>
      )}
      <Box marginTop={3}>
        <Button component={Link} to="/" variant="outlined" className="home-button">
          Home
        </Button>
      </Box>
    </Box>
  );
};

export default ResultsPage;
