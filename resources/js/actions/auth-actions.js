import axios from 'axios';
import setAuthToken from "../auth/setAuthToken";

export const USER_REGISTER = 'users:register';
export const USER_REGISTER_FAIL = 'users:fail-register';
export const USER_LOGIN = 'users:login';
export const USER_LOGIN_FAIL = 'users:fail-login';
export const USER_LOGOUT = 'users:logout';
export const TOKEN_VALID = 'token:valid';

export function login(user) {
    return (dispatch) => {
        let userData = new FormData;
        for (let property in user) {
            userData.append(property, user[property]);
        }
        return axios.post("/api/login", userData)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    let appState = {
                        isLoggedIn: true,
                        user: res.data.data,
                        expires_in : res.data.data.expires_in
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    setAuthToken(res.data.data.auth_token);

                    dispatch({
                        type: USER_LOGIN,
                        payload: {
                            user: res.data.data
                        }
                    });
                } else {
                    dispatch({
                        type: USER_LOGIN_FAIL,
                        payload: {
                            error: res.data.data
                        }
                    });
                }
            });
    }
}

export function logout() {
    return (dispatch) => {
        axios.get('/api/logout').then(res=>{
            console.log(res.data);
            let appState = {
                isLoggedIn: false,
                user: {}
            };
            localStorage["appState"] = JSON.stringify(appState);
            setAuthToken(false);
            dispatch({
                type: USER_LOGOUT,
                payload: {}
            });
        })
    };
}

export function tokenRevoked() {
    return (dispatch) => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        dispatch({
            type: USER_LOGOUT,
            payload: {}
        });
    }
}

export function tokenValid() {
    return (dispatch) => {
        dispatch({
            type: TOKEN_VALID,
            payload: {}
        });
    }
}

export function register(user) {
    return (dispatch) => {
        let userData = new FormData;
        for (let property in user) {
            userData.append(property, user[property]);
        }
        return axios.post("/api/register", userData)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    let appState = {
                        isLoggedIn: true,
                        user: res.data.data
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    setAuthToken(res.data.data.auth_token);
                    dispatch({
                        type: USER_REGISTER,
                        payload: {
                            user: res.data.data
                        }
                    });
                } else {
                    dispatch({
                        type: USER_REGISTER_FAIL,
                        payload: {
                            error: res.data.data
                        }
                    });
                }
            });
    }
}
