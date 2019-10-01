import axios from 'axios';

export const USER_REGISTER = 'users:register';
export const USER_REGISTER_FAIL = 'users:fail-register';
export const USER_LOGIN = 'users:login';
export const USER_LOGIN_FAIL = 'users:fail-login';
export const USER_LOGOUT = 'users:logout';

export function login(user) {
    return (dispatch) => {
        let userData = new FormData;
        for (let property in user) {
            userData.append(property, user[property]);
        }
        return axios.post("/api/user/login", userData)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    let appState = {
                        isLoggedIn: true,
                        user: res.data.data
                    };
                    localStorage["appState"] = JSON.stringify(appState);
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
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        dispatch({
            type: USER_LOGOUT,
            payload: {}
        });
    };
}

export function register(user) {
    return (dispatch) => {
        let userData = new FormData;
        for (let property in user) {
            userData.append(property, user[property]);
        }
        return axios.post("/api/user/register", userData)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    let appState = {
                        isLoggedIn: true,
                        user: res.data.data
                    };
                    localStorage["appState"] = JSON.stringify(appState);
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
