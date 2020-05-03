import {
    GET_FROM_QUEUE_SUCCESS,
    PURGE_ENTERED_LIST
} from "../actions";

export default (state = {
    enteredCustomer: ''
}, action) => {
    switch (action.type) {
        case GET_FROM_QUEUE_SUCCESS:
            return {
                ...state,
                enteredCustomer: action.customerId
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