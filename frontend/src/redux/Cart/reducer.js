import { ADD_TO_CART, CART_MESSAGE } from "./action.type";


const initstate={
error:false,
success:false,
message:""
}


export const reducer = (state = initstate, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if(action.payload.hasOwnProperty("message")){
        state={...state,success:true,message:action.payload.message,error:false}
      }
      if (action.payload.hasOwnProperty("error")) {
        state = { ...state, error: true, message: action.payload.error ,success:false};
      }
      return state;
    }
   case CART_MESSAGE:{
    return {...state,...action.payload}
   }
    default: {
      return state;
    }
  }
};