import axios from 'axios';
import {USER_LOGIN, USER_LOGIN_FAIL, USER_LOGOUT} from "./auth-actions";

export const PROJECT_CREATED = 'project:create';
export const PROJECTS_FETCHED = 'projects:fetch';

export function createProject(project) {
    return (dispatch) => {
        return axios.post("/api/projects", project)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    dispatch({
                        type: PROJECT_CREATED,
                        payload: {
                            project
                        }
                    });
                }
            });
    };
}

export function fetchProjects() {
    return (dispatch) => {
        return axios.get('/api/projects/list')
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    dispatch({
                        type: PROJECTS_FETCHED,
                        payload: {
                            projects:res.data.data
                        }
                    })
                }
            })
    }
}

export function editProject(id) {
    return(dispatch)=>{
        return axios.get(`/api/projects/edit/${id}`).then(res=>{
            console.log(res.data);
        })
    }
}
