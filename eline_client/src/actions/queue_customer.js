import axios from 'axios';
import { socket } from '../App';

export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const MOVE_UP_IN_QUEUE = "MOVE_UP_IN_QUEUE";
export const SET_INITIAL_POSITION = "SET_INITIAL_POSITION";

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

const receiveMoveUp = () => {
    return {
        type: MOVE_UP_IN_QUEUE
    };
};

export const addToQueue = (store) => dispatch => {
    dispatch(receiveAddToQueue(store))
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
