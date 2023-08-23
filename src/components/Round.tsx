import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { RoundData, Activity } from '../types';
import Question from './Question';
import RoundScreen from './RoundScreen';

interface RoundProps {
  round: RoundData;
  onNextRound: (userResponses: boolean[]) => void;
  activity: Activity;
  virtual: boolean;
}

const Round: React.FC<RoundProps> = ({ activity, round, onNextRound, virtual }) => {
  const [questionIndex, setQuestionIndex] = useState(-1); // Start with -1 to show RoundScreen first
  const [showRoundScreen, setShowRoundScreen] = useState(true);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const currentQuestion = questionIndex >= 0 ? round.questions[questionIndex] : null;

  const onAnswerSelected = (isCorrect: boolean) => {   
    if (currentQuestion) {
      const questionIsCorrect = currentQuestion.is_correct;
      console.log('Ans: ', isCorrect, ' ?: ', questionIsCorrect);
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, isCorrect === questionIsCorrect]);
      console.log(userAnswers)
    }
  };

  const handleAnswerSelected = (isCorrect: boolean) => {
    onAnswerSelected(isCorrect);
    if (questionIndex === round.questions.length - 1) {
      console.log('reseting')
      setQuestionIndex(-1); 
      setShowRoundScreen(true);
      onNextRound(userAnswers);
    } else {
      setShowRoundScreen(false);
      setQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
    }
  };

  useEffect(() => {
    if (showRoundScreen === true) {
      console.log('timing out')
      setTimeout(() => {
        setQuestionIndex(0);
        setShowRoundScreen(false); // Hide the RoundScreen after 2 seconds
      }, 2000);
    }
  }, [showRoundScreen]);

  return (
    <Box className="round">
      {showRoundScreen ? (
        <RoundScreen roundTitle={round.round_title} />
      ) : (
        currentQuestion && (
          <Box>
            <Typography variant="h4" component="h2" align="center">
              {
                virtual
                ? activity.activity_name
                : `Activity 1 - Round ${round.order}`
              }
            </Typography>
            <Question
              question={currentQuestion.stimulus}
              onAnswerSelected={handleAnswerSelected}
              onNextQuestion={() => {
                setQuestionIndex(questionIndex + 1);
              }}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default Round;
