import axios from 'axios';
import { socket } from '../App';

export const ADD_TO_QUEUE_SUCCESS = "ADD_TO_QUEUE_SUCCESS";
export const ADD_TO_QUEUE_FAILURE= "ADD_TO_QUEUE_FAILURE";
export const ADD_TO_QUEUE_REQUEST= "ADD_TO_QUEUE_REQUEST";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const MOVE_UP_IN_QUEUE = "MOVE_UP_IN_QUEUE";
export const SET_INITIAL_POSITION = "SET_INITIAL_POSITION";
export const WAIT_FOR_ARRIVAL = "WAIT_FOR_ARRIVAL";


const receiveAddToQueueRequest = () =>  {
    return {
        type: ADD_TO_QUEUE_REQUEST
    };
};

const receiveAddToQueueSuccess = (storeId, storeName) =>  {
    return {
        type: ADD_TO_QUEUE_SUCCESS,
        storeId,
        storeName
    };
};

const receiveAddToQueueFailure = () =>  {
    return {
        type: ADD_TO_QUEUE_FAILURE
    };
};

const receiveRemoveFromQueue = () =>  {
    return {
        type: REMOVE_FROM_QUEUE
    };
};

const receiveMoveUp = () => {
    return {
        type: MOVE_UP_IN_QUEUE
    };
};

export const addToQueueRequest = () => dispatch => {
    dispatch(receiveAddToQueueRequest());
}

export const addToQueueSuccess = (storeId, storeName) => dispatch => {
    dispatch(receiveAddToQueueSuccess(storeId, storeName))
}

export const addToQueueFailure = (store) => dispatch => {
    dispatch(receiveAddToQueueFailure(store))
}

export const removeFromQueue = () => dispatch => {
    dispatch(receiveRemoveFromQueue());
}

export const moveUpInQueue = () => dispatch => {
    dispatch(receiveMoveUp());
}

export const setInitialPosition = (pos) => dispatch => {
    dispatch({type: SET_INITIAL_POSITION, pos});
}

export const waitForArrival = () => dispatch => {
    dispatch({type: WAIT_FOR_ARRIVAL});
}
