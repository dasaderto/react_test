import {USER_LOGIN, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER, USER_REGISTER_FAIL} from "../actions/auth-actions";

const initialState = {
    isLoggedIn: localStorage['appState'] ? JSON.parse(localStorage['appState']).isLoggedIn : false,
    user: localStorage['appState'] ? JSON.parse(localStorage['appState']).user : [],
};

export default function questionReducer(state = initialState, {type, payload}) {
    switch (type) {
        case USER_REGISTER:
            state = {
                ...state,
                isLoggedIn: true,
                user: payload.user
            };
            return state;
        case USER_LOGIN:
            state = {
                ...state,
                isLoggedIn: true,
                user: payload.user
            };
            return state;
        case USER_LOGIN_FAIL:
            alert(payload);
            return state;
        case USER_REGISTER_FAIL:
            alert(payload);
            return state;
        case USER_LOGOUT:
            alert('logout success');
            state = {
                ...state,
                isLoggedIn: false,
                user: {}
            };
            return state;
        default:
            return state;
    }
}
