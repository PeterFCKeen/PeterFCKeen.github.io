import React from 'react';

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
    <div className="question">
      <h2>{question}</h2>
      <button onClick={() => handleAnswerSelected(true)}>Correct</button>
      <button onClick={() => handleAnswerSelected(false)}>Incorrect</button>
    </div>
  );
};

export default Question;
