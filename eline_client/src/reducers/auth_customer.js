import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAILURE
} from "../actions";

export default (state = {
    isVerifying: false,
    verifyError: false,
    isAuthenticated: false,
    user: ''
}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        case VERIFY_REQUEST:
            return{
                ...state,
                isVerifying: true     
            };
        case VERIFY_SUCCESS:
            return{
                ...state,
                isVerifying: false,
                isAuthenticated: true,
                user: action.user,
                verifyError: false
            };
        case VERIFY_FAILURE:
            return{
                ...state,
                isVerifying: false,
                isAuthenticated: false, 
                verifyError: true
            }
        default:
            return state;
    }
}