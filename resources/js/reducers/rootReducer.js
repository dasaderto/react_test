import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import questionReducer from "./questionReducer";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import setAuthToken from "../auth/setAuthToken";
import {tokenRevoked, tokenValid} from "../actions/auth-actions";
import axios from "axios";

const authMiddleware = store => next => action => {
    if(localStorage['appState']) {
        if (new Date(JSON.parse(localStorage['appState']).user.expires_in) <= Date.now()) {
            setAuthToken(false);
            console.log("token invalid")
            store.dispatch(tokenRevoked());
        }else{
            setAuthToken(JSON.parse(localStorage['appState']).user.auth_token);
            console.log("token valid")
        }
    }
    console.log("Auth middleware");
    next(action);
};

const rootReducer = combineReducers({
    adminReducer,
    questionReducer,
    authReducer
});

export const store = createStore(rootReducer,applyMiddleware(authMiddleware,thunk));
