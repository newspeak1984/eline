export const GET_FROM_QUEUE_SUCCESS = "GET_FROM_QUEUE_SUCCESS";
export const GET_FROM_QUEUE_FAILURE = "GET_FROM_QUEUE_FAILURE";
export const PURGE_ENTERED_LIST = "PURGE_ENTERED_LIST";
export const ADD_ARRIVING_CUSTOMER = "ADD_ARRIVING_CUSTOMER";
export const REMOVE_ENTERED_CUSTOMER = "REMOVE_ENTERED_CUSTOEMR";
export const REMOVE_ARRIVING_CUSTOMER = "REMOVE_ARRIVING_CUSTOMER";

const retrieveFromQueueSuccess = (customer) =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_SUCCESS,
        customer
    };
};

const retrieveFromQueueFailure = () =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_FAILURE
    };
};

const receiveArrivingCustomer = (arrivingCustomers) => {
    return {
        type: ADD_ARRIVING_CUSTOMER,
        arrivingCustomers
    }
}

const receiveEnteredCustomer = (arrivingCustomers) => {
    return {
        type: REMOVE_ENTERED_CUSTOMER,
        arrivingCustomers
    }
}

export const getFromQueue = (customer) => dispatch => {
    dispatch(retrieveFromQueueSuccess(customer));
}

export const purgeEnteredList = () => dispatch => {
    dispatch({type: PURGE_ENTERED_LIST});
}

export const addToArrviedList = (customer) => (dispatch, getState) => {
    const {arrivingCustomers} = getState().queue_admin;
    if (arrivingCustomers.length >= 10){
        arrivingCustomers.splice(0,1);
    }
    arrivingCustomers.push(customer);
    dispatch(receiveArrivingCustomer(arrivingCustomers))
}

export const removeEnteringCustomer = (index) => (dispatch, getState) => {
    const {arrivingCustomers} = getState().queue_admin;
    arrivingCustomers.splice(index,1);
    dispatch(receiveEnteredCustomer(arrivingCustomers))
}

export const removeArrivingCustomer = () => (dispatch) => {
    dispatch({type: REMOVE_ARRIVING_CUSTOMER});
}
