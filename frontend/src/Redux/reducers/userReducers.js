import * as actions from "../constant/userConstant";

export const userReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
        case actions.REGISTER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case actions.LOGIN_SUCCESS:
        case actions.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case actions.LOGIN_FAIL:
        case actions.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};