import { ADD_TO_CART, CART_MESSAGE } from "./action.type";


export const AddtToCart = (payload) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload });
};

export const CartMessage=(payload)=>(dispatch)=>{
dispatch({ type: CART_MESSAGE, payload });
}