import * as actions from "../constant/userConstant";

export const userReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
        case actions.REGISTER_REQUEST:
        case actions.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case actions.LOGIN_SUCCESS:
        case actions.REGISTER_SUCCESS:
        case actions.LOAD_USER_SUCCESS:
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
        case actions.LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case actions.LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case actions.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case actions.UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    }
};