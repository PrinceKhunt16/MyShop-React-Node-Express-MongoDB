import * as actions from "../constant/userConstant";
import axios from "axios";

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