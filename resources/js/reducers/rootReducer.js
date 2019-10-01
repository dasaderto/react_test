import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import questionReducer from "./questionReducer";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
    adminReducer,
    questionReducer,
    authReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunk));
