import * as actions from "../constant/orderConstant"

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case actions.CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};