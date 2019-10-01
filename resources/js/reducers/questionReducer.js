import {FETCH_QUESTION, UPDATE_QUESTION} from "../actions/question-actions";

const initialState = {
    questions:[],
};

export default  function  questionReducer(state = initialState,{type,payload}) {
    switch(type){
        case UPDATE_QUESTION:
            state={
                ...state,
                questions:[...state.questions,payload.questions]
            };
            return state;
        default:
            return state;
    }
}
