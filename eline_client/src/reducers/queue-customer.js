import {
    ADD_TO_QUEUE,
    REMOVE_FROM_QUEUE
} from "../actions";

export default (state = {
    inQueue: false,
    currentStore: null
}, action) => {
    switch (action.type) {
        case ADD_TO_QUEUE:
            return {
                ...state,
                inQueue: true,
                currentStore: action.storeId
            };
        case REMOVE_FROM_QUEUE:
            return {
                ...state,
                inQueue: false,
                currentStore: null
            };
        default:
            return state;
    }
}