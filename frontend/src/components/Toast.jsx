import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  "../css/toast.css"
import {CartMessage} from "../redux/Cart/action";
const Toast = () => {
    const { error, message, success } = useSelector(
      (state) => state.cartReducer
    );
    const dispatch=useDispatch()
  
if(error){
    setTimeout(()=>{
    dispatch(CartMessage({error:false, message:"", success:false}));
    },3000)
  return (
    <div
      className={error ? "snackbar show" : "snackbar"}
      style={error ? { background: "green" } : ""}
    >
      {message}
    </div>
  );
}
if(success){
     setTimeout(() => {
       dispatch(CartMessage({ error: false, message: "", success: false }));
     }, 3000);
  return (
    
    <div className={success ? "snackbar show" : "snackbar"} style={success?{background:"green"}:""}>{message}</div>
  );
}

}

export default Toast
