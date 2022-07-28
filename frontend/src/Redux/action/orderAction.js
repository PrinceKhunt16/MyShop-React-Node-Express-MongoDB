import * as actions from "../constant/orderConstant"
import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: actions.CREATE_ORDER_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("/api/v1/order/new", order, config);

        dispatch({
            type: actions.CREATE_ORDER_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: actions.CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });

    }

};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actions.CLEAR_ERRORS,
    });

}