import React from 'react';

const UserInfo = ({ username, highScore, lastFiveScores }) => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold">Welcome, {username}!</h2>
      <p>High Score: {highScore}</p>
      <h3 className="text-lg mt-2">Last 5 Scores:</h3>
      <ul>
        {lastFiveScores.map((score, index) => (
          <li key={index}>{score}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
