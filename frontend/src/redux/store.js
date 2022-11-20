import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {reducer as authReducer} from "./user/reducer"

const rootreducer = combineReducers({ authReducer });


export const store = legacy_createStore(rootreducer, applyMiddleware(thunk));