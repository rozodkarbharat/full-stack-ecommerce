import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
    const {token}=useSelector((state)=>state.authReducer.login)
   
    if(token){
        return children
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default RequireAuth
