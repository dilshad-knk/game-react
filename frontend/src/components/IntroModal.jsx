import React from 'react';

const IntroModal = ({ onLogin, onSkip }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Memory Game!</h2>
        <p className="mb-4">Solve the memory game in fewer moves to reach the top of the leaderboard!</p>
        <p className="mb-4">Login or sign up to save your scores!</p>
        <button onClick={onLogin} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
          Login/Sign up
        </button>
        <button onClick={onSkip} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Skip
        </button>
      </div>
    </div>
  );
};

export default IntroModal;
