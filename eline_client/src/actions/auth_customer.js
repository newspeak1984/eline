import axios from 'axios';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";

const receiveLogin = user =>  {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const receiveLogout =() => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const requestVerify = () => {
    return{
        type: VERIFY_REQUEST
    };
};

const receiveVerify = (data) => {
    return {
        type: VERIFY_SUCCESS,
        user: data.userId, 
        email: data.email
    };
};

const receiveVerifyFailure = () => {
    return {
        type: VERIFY_FAILURE
    };
};

export const loginUser = (user) => dispatch => {
    dispatch(receiveLogin(user));
};

export const logoutUser = () => dispatch => {
    // TODO: logout auth stuff here
};

export const verifyAuth = () => dispatch => {
    dispatch(requestVerify());

    axios.get('http://localhost:5000/login/verifySession', {withCredentials: true})
    .then(res => {
        // console.log(res);
        dispatch(receiveVerify(res.data));
    }).catch(e => {
        // console.log(e);
        dispatch(receiveVerifyFailure());
    });
};
