import {PROJECT_CREATED, PROJECTS_FETCHED, PROJECT_EDIT, PROJECT_UPDATED} from "../actions/admin-actions";

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
            state = {
                ...state,
                projects: payload.projects,
            };
            return state;
        case PROJECT_EDIT:
            state = {
                ...state,
                project: payload.project,
            };
            return state;
        case PROJECT_UPDATED:
            let updatedProjects = state.projects.map(el => {
                return (el.id === payload.project.id) ? payload.project : el;
            });
            state = {
                ...state,
                projects: updatedProjects,
                project: payload.project,
            };
            return state;
        default:
            return state;
    }
}
