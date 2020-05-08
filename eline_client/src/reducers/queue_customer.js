import {
    ADD_TO_QUEUE_SUCCESS,
    ADD_TO_QUEUE_FAILURE,
    ADD_TO_QUEUE_REQUEST,
    REMOVE_FROM_QUEUE,
    MOVE_UP_IN_QUEUE,
    SET_INITIAL_POSITION,
    WAIT_FOR_ARRIVAL
} from "../actions";

export default (state = {
    inQueue: false,
    currentStore: null,
    currentStoreName: null,
    isAddingToQueue: false,
    placement: null,
    isAllowedIn: false
}, action) => {
    switch (action.type) {
        case ADD_TO_QUEUE_REQUEST:
            return {
                ...state, 
                isAddingToQueue: true
            }
        case ADD_TO_QUEUE_SUCCESS:
            return {
                ...state,
                inQueue: true,
                currentStore: action.storeId,
                currentStoreName: action.storeName,
                isAddingToQueue: false
            };
        case ADD_TO_QUEUE_FAILURE:
            return {
                ...state,
                isAddingToQueue: false
            }
        case REMOVE_FROM_QUEUE:
            return {
                ...state,
                inQueue: false,
                currentStore: null,
                currentStoreName: null,
                placement: null,
                isAllowedIn: false
            };
        case MOVE_UP_IN_QUEUE:
            return {
                ...state,
                placement: state.placement - 1
            }
        case SET_INITIAL_POSITION:
            return {
                ...state,
                placement: action.pos
            }
        case WAIT_FOR_ARRIVAL:
            return {
                ...state,
                isAllowedIn: true
            }
        default:
            return state;
    }
}