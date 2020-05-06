export const GET_FROM_QUEUE_SUCCESS = "GET_FROM_QUEUE_SUCCESS";
export const GET_FROM_QUEUE_FAILURE = "GET_FROM_QUEUE_FAILURE";
export const PURGE_ENTERED_LIST = "PURGE_ENTERED_LIST";
export const ADD_ARRIVING_CUSTOMER = "ADD_ARRIVING_CUSTOMER";
export const REMOVE_ENTERED_CUSTOMER = "REMOVED_ENTERED_CUSTOEMR";

const retrieveFromQueueSuccess = (customerId) =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_SUCCESS,
        customerId
    };
};

const retrieveFromQueueFailure = () =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_FAILURE
    };
};

const receiveArrivingCustomer = (enteredCustomers) => {
    return {
        type: ADD_ARRIVING_CUSTOMER,
        enteredCustomers
    }
}

const receiveEnteredCustomer = (enteredCustomers) => {
    return {
        type: REMOVE_ENTERED_CUSTOMER,
        enteredCustomers
    }
}

export const getFromQueue = (customer) => dispatch => {
    dispatch(retrieveFromQueueSuccess(customer));
}

export const purgeEnteredList = () => dispatch => {
    dispatch({type: PURGE_ENTERED_LIST});
}

export const addToArrviedList = (customer) => (dispatch, getState) => {
    const {enteredCustomers} = getState().queue_admin;
    if (enteredCustomers.length >= 10){
        enteredCustomers.splice(0,1);
    }
    enteredCustomers.push(customer);
    dispatch(receiveArrivingCustomer(enteredCustomers))
}

export const removedEnteredCustomer = (index) => (dispatch, getState) => {
    const {enteredCustomers} = getState().queue_admin;
    enteredCustomers.splice(index,1);
    dispatch(receiveEnteredCustomer(enteredCustomers))
}
