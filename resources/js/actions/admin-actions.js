import axios from 'axios';
import {USER_LOGIN, USER_LOGIN_FAIL, USER_LOGOUT} from "./auth-actions";

export const PROJECT_CREATE = 'project:create';
export const PROJECTS_FETCH = 'projects:fetch';
export const PROJECT_FETCH = 'project:fetch';

export function createProject(project) {
    return (dispatch) => {
        return axios.get("/api/users/list?token="+JSON.parse(localStorage["appState"]).user.auth_token)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    dispatch({
                        type: PROJECT_CREATE,
                        payload: {
                            project
                        }
                    });
                }
            });
    };
}
