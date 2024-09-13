import React, { useEffect } from 'react'
import MemoryGame from './components/MemoryGame'
import instance from './axios/axios';
import Header from './components/Header';
import { useRecoilState } from 'recoil';
import { userState } from './atoms';

const App = () => {

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const res = await instance.post('api/v1/verify');


      const { userId,highScore,pastScores } = res.data;
      setUser({
        userId: userId,
        highestScore: highScore,
        pastScore:pastScores,
  
      });
     
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
    <Header/>
    <MemoryGame/>
    
    </>
  )
}

export default App