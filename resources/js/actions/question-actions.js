import axios from 'axios';

export const FETCH_QUESTION = 'questions:fetchQuestion';
export const START_TEST = 'questions:testStart';
export const UPDATE_QUESTION = 'questions:updateQuestions';

export function fetchQuestion(answer){
    return (dispatch)=>{
        return axios.post("/api/questions/list",answer)
            .then(res=>{
                dispatch(updateQuestions(res.data))
            });
    }
}

export function testStart(id){
    return (dispatch)=>{
        return axios.post("/api/test/start",{testId:id})
            .then(res=>{
                dispatch(updateQuestions(res.data))
            });
    }
}

export function updateQuestions(questions) {
    return {
        type: UPDATE_QUESTION,
        payload: {
            questions
        }
    }
}
