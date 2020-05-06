import {
    GET_FROM_QUEUE_SUCCESS,
    PURGE_ENTERED_LIST,
    ADD_ARRIVING_CUSTOMER,
    REMOVE_ENTERED_CUSTOMER
} from "../actions";

export default (state = {
    enteredCustomer: '',
    enteredCustomers: []
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
        case ADD_ARRIVING_CUSTOMER:
            return {
                ...state,
                enteredCustomers: action.enteredCustomers
            }
        case REMOVE_ENTERED_CUSTOMER:
            return {
                ...state,
                enteredCustomers: action.enteredCustomers
            }
        default:
            return state;
    }
}