import {
    GET_FROM_QUEUE
} from "../actions";

export default (state = {
    enteredList: []
}, action) => {
    switch (action.type) {
        case GET_FROM_QUEUE:
            return {
                ...state,
                enteredList: enteredList.push(action.userId)
            };
        default:
            return state;
    }
}