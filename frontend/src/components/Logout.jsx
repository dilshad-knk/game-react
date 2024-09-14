import React from 'react'
import instance from '../axios/axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms';

const Logout = () => {

    const setUser = useSetRecoilState(userState);

    const handleLogout = async() => {
        await instance.post('/api/v1/logout');
          
        
        setUser({});
        
       
        localStorage.removeItem('token');
        
       
        window.location.href = '/login'; 
      }
  return (
    <div className='text-center mt-4'>
    <button
      onClick={handleLogout}
      className='px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition'
    >
      Log Out
    </button>
  </div>
  )
}

export default Logout