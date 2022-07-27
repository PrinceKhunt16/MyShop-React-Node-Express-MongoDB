import * as actions from "../constant/userConstant";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: actions.LOGIN_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(
            `api/v1/login`,
            { email, password },
            config
        );

        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: actions.LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
}

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: actions.REGISTER_REQUEST
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(
            `/api/v1/register`, 
            userData, 
            config
        );

        dispatch({
            type: actions.REGISTER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: actions.REGISTER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.LOAD_USER_REQUEST
        });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({
            type: actions.LOAD_USER_SUCCESS, payload: data.user
        });

    } catch (error) {
        dispatch({
            type: actions.LOAD_USER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch({
            type: actions.LOGOUT_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: actions.LOGOUT_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: actions.UPDATE_PROFILE_REQUEST
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch({
            type: actions.UPDATE_PROFILE_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: actions.UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });

    }
};