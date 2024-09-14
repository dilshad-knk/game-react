import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

const Header = () => {
  const { highestScore } = useRecoilValue(userState);



  return (
    <div>
      <div className='text-4xl font-bold text-center p-5 text-white bg-amber-400 mx-auto'>
        Memory Game
      </div>
      <div className='text-center p-4 font-bold bg-green-500 text-white shadow-lg'>
        Highest Score:
        {highestScore === 0
          ? 'No score'
          : `${highestScore} moves`
        }
      </div>

    </div>
  );
}

export default Header;
