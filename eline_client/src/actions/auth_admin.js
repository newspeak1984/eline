import axios from 'axios';

export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGOUT_SUCCESS = "ADMIN_LOGOUT_SUCCESS";
export const ADMIN_VERIFY_REQUEST = "ADMIN_VERIFY_REQUEST";
export const ADMIN_VERIFY_SUCCESS = "ADMIN_VERIFY_SUCCESS";
export const ADMIN_VERIFY_FAILURE = "ADMIN_VERIFY_FAILURE";

const receiveLogin = adminId =>  {
    return {
        type: ADMIN_LOGIN_SUCCESS,
        adminId
    };
};

const receiveLogout =() => {
    return {
        type: ADMIN_LOGOUT_SUCCESS
    };
};

const requestVerify = () => {
    return{
        type: ADMIN_VERIFY_REQUEST
    };
};

const receiveVerify = (data) => {
    return {
        type: ADMIN_VERIFY_SUCCESS,
        adminId: data.adminId,
        storeId: data.storeId,
        storeName: data.storeName
    };
};

const receiveVerifyFailure = () => {
    return {
        type: ADMIN_VERIFY_FAILURE
    };
};

export const loginUser = (adminId) => dispatch => {
    dispatch(receiveLogin(adminId));
};

export const logoutUser = () => dispatch => {
    // TODO: logout auth stuff here
};

export const verifyAdminAuth = () => dispatch => {
    dispatch(requestVerify());

    axios.get('https://e-line-app.herokuapp.com/admin/verifySession', { withCredentials: true })
    .then(res => {
        console.log(res);
        dispatch(receiveVerify(res.data));
    }).catch(e => {
        console.log(e);
        dispatch(receiveVerifyFailure());
    });
};
