import {PROJECT_CREATED,PROJECTS_FETCHED}  from "../actions/admin-actions";

let initialState = {};

export default function adminReducer(state = initialState, {type, payload}) {
    switch (type) {
        case PROJECT_CREATED:
            alert('Project sucessful create');
            state = {
                ...state,
                project: payload.project,
            };
            return state;
        case PROJECTS_FETCHED:
            console.log(payload);
            state = {
                ...state,
                projects: payload.projects,
            };
            return state;
        default:
            return state;
    }
}
