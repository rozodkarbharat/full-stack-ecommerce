import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const HasAuth = ({children}) => {
   const { token } = useSelector((state) => state.authReducer.login);

   if (token) {
     return <Navigate to="/" />
   } 
   else {
     return children;   
    }
}

export default HasAuth
