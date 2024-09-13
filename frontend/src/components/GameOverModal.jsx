import React from 'react';

const GameOverModal = ({ moves, onReset }) => {
  return (
    <div className="text-center mt-8">
      <h2 className="text-3xl font-bold text-green-600 animate-bounce">Congratulations! You won!</h2>
      <p className="text-xl mt-2">Total moves: {moves}</p>
      <button onClick={onReset} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Play Again
      </button>
    </div>
  );
};

export default GameOverModal;
