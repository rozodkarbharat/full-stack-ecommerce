import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {reducer as authReducer} from "./user/reducer"
import { reducer as cartReducer } from "./Cart/reducer";

const rootreducer = combineReducers({ authReducer,cartReducer });


export const store = legacy_createStore(rootreducer, applyMiddleware(thunk));



// testing the github 