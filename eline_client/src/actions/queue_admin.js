import axios from 'axios';
import { socket } from "../App";

export const GET_FROM_QUEUE_SUCCESS = "GET_FROM_QUEUE_SUCCESS";
export const GET_FROM_QUEUE_FAILURE = "GET_FROM_QUEUE_FAILURE";

const retrieveFromQueueSuccess = (storeId, customerId) =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_SUCCESS,
        storeId, 
        customerId
    };
};

const retrieveFromQueueFailure = () =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_FAILURE
    };
};


export const getFromQueue = (store, customer) => dispatch => {
    socket.emit('getNext', {
        storeId: store,
        customerId: customer
    });
    dispatch(retrieveFromQueueSuccess(store, customer));
}
