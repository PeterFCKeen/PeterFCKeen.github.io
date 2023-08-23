import React, { useState, useEffect } from 'react';
import { Activity, RoundData } from './types';

interface ResultsPageProps {
  userAnswers: boolean[];
  activity: Activity;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ userAnswers, activity }) => {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading for 0.25 seconds, then set loading to false
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
    <div className="results-page">
      <h2>Results</h2>
      
      {hasRounds ? (
        <React.Fragment>
          <h3>Results Breakdown Per Round</h3>
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
                <div key={roundIndex} className="round-results">
                  <h4>{`Round ${roundIndex + 1}`}</h4>
                  {round.questions.map((_, questionIndex) => (
                    <p key={questionIndex}>
                      {generateQuestionResultText(
                        startIndex + questionIndex,
                        userAnswers[startIndex + questionIndex]
                      )}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Display results for non-round-based activity */}
          <h3>Results for Non-Round-Based Activity</h3>
          {activity.questions.map((_, questionIndex) => (
            <p key={questionIndex}>
              {generateQuestionResultText(questionIndex, userAnswers[questionIndex])}
            </p>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default ResultsPage;
