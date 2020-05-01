import axios from 'axios';
import { socket } from '../App';

export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";

const receiveAddToQueue = (storeId) =>  {
    return {
        type: ADD_TO_QUEUE,
        storeId
    };
};

const receiveRemoveFromQueue = () =>  {
    return {
        type: REMOVE_FROM_QUEUE
    };
};

export const addToQueue = (store, customer) => dispatch => {
    socket.emit('enter', {
        storeId: store,
        customerId: customer
    });
    dispatch(receiveAddToQueue(store))
}

export const removeFromQueue = () => dispatch => {
    dispatch(receiveRemoveFromQueue());
}
