export const GET_FROM_QUEUE_SUCCESS = "GET_FROM_QUEUE_SUCCESS";
export const GET_FROM_QUEUE_FAILURE = "GET_FROM_QUEUE_FAILURE";
export const PURGE_ENTERED_LIST = "PURGE_ENTERED_LIST";

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


export const getFromQueue = (customer) => dispatch => {
    dispatch(retrieveFromQueueSuccess(customer));
}

export const purgeEnteredList = () => dispatch => {
    dispatch({type: PURGE_ENTERED_LIST});
}
