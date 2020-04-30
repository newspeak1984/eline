import axios from 'axios';

export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";

const addToQueue = (userId, storeId) =>  {
    return {
        type: ADD_TO_QUEUE,
        userId,
        storeId
    };
};

const removeFromQueue = (userId, storeId) =>  {
    return {
        type: REMOVE_FROM_QUEUE,
        userId,
        storeId
    };
};
