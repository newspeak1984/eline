import {
    GET_FROM_QUEUE_SUCCESS
} from "../actions";

export default (state = {
    enteredList: ''
}, action) => {
    switch (action.type) {
        case GET_FROM_QUEUE_SUCCESS:
            return {
                ...state,
                entered: action.customerId
                // TODO: make an array and cap the size?
            };
        default:
            return state;
    }
}