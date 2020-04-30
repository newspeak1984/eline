import axios from 'axios';

export const GET_FROM_QUEUE_SUCCESS = "GET_FROM_QUEUE_SUCCESS";
export const GET_FROM_QUEUE_FAILURE = "GET_FROM_QUEUE_FAILURE";

const retrieveFromQueueSuccess = (storeId) =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_SUCCESS,
        storeId
    };
};

const retrieveFromQueueFailure = () =>  {
    // TODO: take storeId then ping mongo for the queue url?
    return {
        type: GET_FROM_QUEUE_FAILURE
    };
};


export const getFromQueue = () => dispatch => {
    axios.post('http://localhost:5000/admin/get_next', )
    .then(res => {
        console.log(res);
        dispatch(receiveVerify());
    }).catch(e => {
        console.log(e);
        dispatch(receiveVerifyFailure());
    });
}
