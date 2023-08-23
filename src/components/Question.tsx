import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface QuestionProps {
  question: string;
  onAnswerSelected: (isCorrect: boolean) => void;
  onNextQuestion: () => void; // Add this prop
}

const Question: React.FC<QuestionProps> = ({ question, onAnswerSelected, onNextQuestion }) => {
  const handleAnswerSelected = (isCorrect: boolean) => {
    onAnswerSelected(isCorrect);
    onNextQuestion(); // Move to the next question
  };

  return (
    <Box className="question" display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" align="center" gutterBottom>
        {question}
      </Typography>
      <Box display="flex" justifyContent="center" gap={10}>
        <Button variant="outlined" onClick={() => handleAnswerSelected(true)}>
          Correct
        </Button>
        <Button variant="outlined" onClick={() => handleAnswerSelected(false)}>
          Incorrect
        </Button>
      </Box>
    </Box>
  );
};

export default Question;
