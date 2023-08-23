import React, { useEffect } from 'react';

interface RoundScreenProps {
  roundTitle: string;
}

const RoundScreen: React.FC<RoundScreenProps> = ({ roundTitle }) => {
  return (
    <div className="round-screen">
      <h2>{roundTitle}</h2>
    </div>
  );
};

export default RoundScreen;

