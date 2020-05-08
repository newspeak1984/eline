import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT_SUCCESS,
    ADMIN_VERIFY_REQUEST,
    ADMIN_VERIFY_SUCCESS,
    ADMIN_VERIFY_FAILURE
} from "../actions";

export default (state = {
    isVerifying: false,
    verifyError: false,
    isAdminAuthenticated: false,
    adminId: '',
    storeId: '',
    storeName: ''
}, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isAdminAuthenticated: true,
                adminId: action.adminId,
                storeId: action.storeId,
                storeName: action.storeName
            };
        case ADMIN_LOGOUT_SUCCESS:
            return {
                ...state,
                isAdminAuthenticated: false,
                adminId: '',
                storeId: '',
                storeName: ''
            };
        case ADMIN_VERIFY_REQUEST:
            return{
                ...state,
                isVerifying: true     
            };
        case ADMIN_VERIFY_SUCCESS:
            return{
                ...state,
                isVerifying: false,
                isAdminAuthenticated: true,
                adminId: action.adminId,
                storeId: action.storeId,
                storeName: action.storeName,
                verifyError: false
            };
        case ADMIN_VERIFY_FAILURE:
            return{
                ...state,
                isVerifying: false,
                isAdminAuthenticated: false, 
                verifyError: true,
                adminId: '',
                storeId: '',
                storeName: ''
            }
        default:
            return state;
    }
}