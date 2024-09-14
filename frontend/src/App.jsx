import React, { useEffect } from 'react'
import MemoryGame from './components/MemoryGame'
import instance from './axios/axios';
import Header from './components/Header';
import { useRecoilState } from 'recoil';
import { userState } from './atoms';
import Logout from './components/Logout';

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
      localStorage.removeItem('token');
      console.log(error);
      
    }
  };

  return (
    <>
    <Header/>
    <MemoryGame/>
    <Logout/>
    
    </>
  )
}

export default App