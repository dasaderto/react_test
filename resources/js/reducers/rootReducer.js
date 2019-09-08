import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import questionReducer from "./questionReducer";

const rootReducer = combineReducers({questionReducer});

export const store = createStore(rootReducer,applyMiddleware(thunk));