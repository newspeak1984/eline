import {
    GET_FROM_QUEUE_SUCCESS,
    PURGE_ENTERED_LIST
} from "../actions";

export default (state = {
    enteredList: []
}, action) => {
    switch (action.type) {
        case GET_FROM_QUEUE_SUCCESS:
            return {
                ...state,
                enteredList: [...state.enteredList, action.customerId]
                // TODO: cap the size?
            };
        case PURGE_ENTERED_LIST:
            return {
                ...state, 
                enteredList: []
            }
        default:
            return state;
    }
}