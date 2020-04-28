import axios from 'axios';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user =>  {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestLogout = () => {
    return{
        type: LOGOUT_REQUEST
    };
};
const receiveLogout =() => {
    return {
        type: LOGOUT_SUCCESS
    };
};
const logoutError = () =>{
    return{
        type: LOGOUT_FAILURE
    };
};
const requestVerify = () => {
    return{
        type: VERIFY_REQUEST
    };
};
const receiveVerify = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginUser = (credentials) => dispatch => {
    dispatch(requestLogin());

    axios.post('http://localhost:5000/login/', credentials)
    .then(res => {
        console.log(res);
        dispatch(receiveLogin(res));
        window.location = '/home/'
    }).catch(e => {
        console.log(e);
        dispatch(loginError());
    });
};

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());

    // TODO: logout auth stuff here

    // myFirebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //         dispatch(receiveLogout());
    //     })
    //     .catch(error => {
    //         dispatch(logoutError());
    //     })
};

export const verifyAuth = () => dispatch => {
    dispatch(requestVerify());

    // TODO: auth verification stuff here

    // myFirebase.auth().onAuthStateChanged(user => {
    //     if (user !== null){
    //         dispatch(receiveLogin(user));
    //     }
    //     dispatch(receiveVerify());
    // });
};