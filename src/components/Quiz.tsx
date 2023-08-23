import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Round from './Round';
import ResultsPage from './ResultsPage';
import { Activity, RoundData, QuestionData } from '../types';

interface QuizProps {
  activity: Activity;
}

const Quiz: React.FC<QuizProps> = ({ activity }) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const onNextRound = (userResponses: boolean[]) => {
    setUserAnswers(userResponses);
    setRoundIndex(roundIndex + 1);
  };

  if (roundIndex >= activity.questions.length) {
    return <ResultsPage userAnswers={userAnswers} activity={activity} />;
  }

  const currentRoundOrQuestion = activity.questions[roundIndex];

  if ('questions' in currentRoundOrQuestion) {
    const currentRound = currentRoundOrQuestion as RoundData;

    return (
      <Round
        activity={activity}
        round={currentRound}
        onNextRound={onNextRound}
        virtual={false}
      />
    );
  } else {
    if (roundIndex > 0) {
      return <ResultsPage userAnswers={userAnswers} activity={activity} />;
    } else {
      const virtualRound = {
        round_title: activity.activity_name,
        order: activity.order,
        questions: activity.questions,
      }
      const currentRound = virtualRound as RoundData;
      return (
        <Box>
          <Round
            activity={activity}
            round={currentRound}
            onNextRound={onNextRound}
            virtual={true}
          />
        </Box>
      );
    }
  }
};

export default Quiz;
