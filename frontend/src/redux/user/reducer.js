import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./action.type"

const initstate = {
  login: {
    isLoading: false,
    isError: false,
    isAuth: false,
    token: JSON.parse(localStorage.getItem("token")) || "",
    // username: JSON.parse(localStorage.getItem("username")) || "",
  },
  signup: {
    isLoading: false,
    isError: false,
  },
};

export const reducer=(state=initstate,action)=>{
switch (action.type) {
  case LOGIN_SUCCESS: {
    const token = action.payload.token;
    const username = action.payload.username;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("username", JSON.stringify(username));
    return {
      ...state,
      login: {
        token,
        isAuth: true,
        isLoading: false,
        isError: false,
        username,
      },
    };
  }
  case LOGIN_LOADING: {
    // console.log("loading");
    return {
      ...state,
      login: { isLoading: true, isError: false, isAuth: false, token: "" },
    };
  }
  case LOGIN_ERROR: {
    return {
      ...state,
      login: {
        isLoading: false,
        isError: action.payload,
        isAuth: false,
        token: "",
      },
    };
  }
  case SIGNUP_LOADING: {
    return { ...state, signup: { isLoading: true, isError: false } };
  }
  case SIGNUP_SUCCESS: {
    return { ...state, signup: { isLoading: false, isError: false } };
  }
  case SIGNUP_ERROR: {
    return { ...state, signup: { isLoading: false, isError: action.payload } };
  }
  case LOGOUT:{
    localStorage.removeItem("token");
    return {
      ...state,
      login: {
        isLoading: false,
        isError: false,
        isAuth: false,
        token: "",
      },
    };
  }
  default: {
    return state;
  }
}
}