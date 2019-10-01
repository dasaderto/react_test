import {PROJECT_CREATE,PROJECT_FETCH,PROJECTS_FETCH}  from "../actions/admin-actions";

let initialState = {};

export default function adminReducer(state = initialState, {type, payload}) {
    switch (type) {
        case PROJECT_CREATE:
            alert('Project sucessful create');
            return state;
        default:
            return state;
    }
}
