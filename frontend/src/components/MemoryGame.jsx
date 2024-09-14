import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import axios from 'axios';
import { useRecoilState } from 'recoil'; 
import { userState } from '../atoms';
import instance from '../axios/axios';

const CARD_SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

function shuffleArray(array) {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user.userId) {
      resetGame();
      fetchHighScore();
    }
  }, [user.userId]);

  const resetGame = () => {
    const shuffledCards = shuffleArray([...CARD_SYMBOLS, ...CARD_SYMBOLS]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
    setIsNewHighScore(false);
  };

  const fetchHighScore = async () => {
    try {
      if (!user.userId) return; // Ensure userId is present

      const response = await instance.get('api/v1/highscore', {
        params: { userId: user.userId },
      });

      setUser((prevUser) => ({
        ...prevUser,
        highestScore: response.data.highScore,
      }));
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      if (cards[newFlippedCards[0]] === cards[newFlippedCards[1]]) {
        const newMatchedCards = [...matchedCards, ...newFlippedCards];
        setMatchedCards(newMatchedCards);
        setFlippedCards([]);

        if (newMatchedCards.length === cards.length) {
          setGameWon(true);
          checkHighScore(moves + 1);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const checkHighScore = async (finalMoves) => {
    try {
      if (!user.userId) {
        throw new Error('User ID is missing');
      }

      const response = await instance.post('api/v1/update', {
        userId: user.userId,
        moves: finalMoves,
      });

      setIsNewHighScore(response.data.isNewHighScore);
      fetchHighScore();
    } catch (error) {
      console.error('Error updating high score:', error);
    }
  };

  return (
    <div>
      {gameWon ? (
        <div className="text-center mt-8">
          {isNewHighScore ? (
            <>
              <Confetti />
              <h2 className="text-3xl font-bold text-green-600 animate-bounce">
                New High Score: {moves} Moves!
              </h2>
            </>
          ) : (
            <h2 className="text-4xl font-bold text-green-700 animate-bounce">You Won in {moves} Moves!</h2>
          )}
          <button onClick={resetGame} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded">
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-12 mx-16 mt-10">
          {cards.map((symbol, index) => (
            <div
              key={index}
              className={`card h-16 rounded-lg shadow-lg text-4xl cursor-pointer flex items-center justify-center transition-all duration-300 ${
                flippedCards.includes(index) || matchedCards.includes(index) ? 'bg-white' : 'bg-gray-300'
              } ${gameWon ? 'pointer-events-none' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {flippedCards.includes(index) || matchedCards.includes(index) ? symbol : '?'}
            </div>
          ))}
        </div>
      )}

      <div className='text-center text-2xl bg-red-900 m-10 py-4 text-white'>
        Moves : {moves}
      </div>
    </div>
  );
};

export default MemoryGame;
