import axios from 'axios';

export const PROJECT_CREATED = 'project:create';
export const PROJECTS_FETCHED = 'projects:fetch';
export const PROJECT_EDIT = 'projects:edit';
export const PROJECT_UPDATED = 'project:update';

export function createProject(project) {
    return (dispatch) => {
        return axios.post("/api/projects", project)
            .then(res => {
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
            if (res.data.success) {
                dispatch({
                    type: PROJECT_EDIT,
                    payload: {
                        project:res.data.data
                    }
                })
            }
        })
    }
}

export function updateProject(project) {
    return(dispatch)=>{
        return axios.put(`/api/projects`,project).then(res=>{
            console.log(res.data);
            if (res.data.success) {
                dispatch({
                    type: PROJECT_UPDATED,
                    payload: {
                        project:res.data.data
                    }
                })
            }
        })
    }
}
