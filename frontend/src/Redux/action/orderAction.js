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

// My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ 
            type: actions.MY_ORDERS_REQUEST
        });

        const { data } = await axios.get("/api/v1/orders/me");

        dispatch({
            type: actions.MY_ORDERS_SUCCESS,
            payload: data.orders
        });

    } catch (error) {
        dispatch({
            type: actions.MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.ORDER_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: actions.ORDER_DETAILS_SUCCESS,
            payload: data.order
        });

    } catch (error) {
        dispatch({
            type: actions.ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get all Orders
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.ALL_ORDERS_REQUEST
        });

        const { data } = await axios.get("/api/v1/admin/orders");

        dispatch({
            type: actions.ALL_ORDERS_SUCCESS,
            payload: data.orders
        });

    } catch (error) {
        dispatch({
            type: actions.ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({
            type: actions.UPDATE_ORDER_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/v1/admin/order/${id}`,
            order,
            config
        );

        dispatch({
            type: actions.UPDATE_ORDER_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: actions.UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.DELETE_ORDER_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({
            type: actions.DELETE_ORDER_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: actions.DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actions.CLEAR_ERRORS,
    });

}