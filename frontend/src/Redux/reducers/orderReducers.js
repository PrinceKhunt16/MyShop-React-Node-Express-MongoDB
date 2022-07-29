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

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case actions.MY_ORDERS_REQUEST:
            return {
                loading: true,
            };
        case actions.MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case actions.MY_ORDERS_FAIL:
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case actions.ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case actions.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case actions.ORDER_DETAILS_FAIL:
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case actions.ALL_ORDERS_REQUEST:
            return {
                loading: true,
            };
        case actions.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case actions.ALL_ORDERS_FAIL:
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

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.UPDATE_ORDER_REQUEST:
        case actions.DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case actions.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case actions.UPDATE_ORDER_FAIL:
        case actions.DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case actions.DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
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
