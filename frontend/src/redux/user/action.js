import axios from "axios";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./action.type";


  export const SignupSuccess = (payload) => (dispatch) => {
    dispatch({ type: SIGNUP_SUCCESS, payload });
  };

  export const SignupLoading=()=>(dispatch)=>{
    dispatch({type:SIGNUP_LOADING})
  }

  export const SignupError = (payload) => (dispatch) => {
    dispatch({ type: SIGNUP_ERROR,payload});
  };



 export const SigninSuccess = (payload) => (dispatch) => {
   dispatch({type:LOGIN_SUCCESS,payload})
 };

  export const SigninLoading = () => (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
  };

  export const SigninError = (payload) => (dispatch) => {
    dispatch({ type: LOGIN_ERROR,payload });
  };

  export const SignOut = (payload) => (dispatch) => {
    dispatch({ type:LOGOUT  });
  };