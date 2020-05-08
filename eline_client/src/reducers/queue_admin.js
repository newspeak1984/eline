import {
    GET_FROM_QUEUE_SUCCESS,
    PURGE_ENTERED_LIST,
    ADD_ARRIVING_CUSTOMER,
    REMOVE_ENTERED_CUSTOMER,
    REMOVE_ARRIVING_CUSTOMER
} from "../actions";

export default (state = {
    arrivingCustomer: '',
    arrivingCustomers: [],
    calledCustomers: 0
}, action) => {
    switch (action.type) {
        case GET_FROM_QUEUE_SUCCESS:
            return {
                ...state,
                arrivingCustomer: action.customer,
                calledCustomers: state.calledCustomers + 1
            };
        case PURGE_ENTERED_LIST:
            return {
                ...state, 
                enteredList: []
            }
        case ADD_ARRIVING_CUSTOMER:
            return {
                ...state,
                arrivingCustomers: action.arrivingCustomers,
                calledCustomers: state.calledCustomers - 1
            }
        case REMOVE_ENTERED_CUSTOMER:
            return {
                ...state,
                arrivingCustomers: action.arrivingCustomers
            }
        case REMOVE_ARRIVING_CUSTOMER:
            return {
                ...state,
                calledCustomers: state.calledCustomers - 1
            }
        default:
            return state;
    }
}