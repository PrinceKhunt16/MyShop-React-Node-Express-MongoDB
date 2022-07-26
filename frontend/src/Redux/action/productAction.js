import axios from "axios";
import * as actions from "../constant/productConstant";

export const getProducts = (keyword = "", currentPage = 1, category, ratings = 0, price = [0, 100000]) => async (dispatch) => {
    try {
        dispatch({
            type: actions.ALL_PRODUCT_REQUEST
        });

        let refrenceLink = `/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        if (category) {
            refrenceLink = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }

        const { data } = await axios.get(refrenceLink);

        dispatch({
            type: actions.ALL_PRODUCT_SUCCESS,
            payload: data,
        });
   
    } catch (error) {
        dispatch({
            type: actions.ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });

    }

}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.PRODUCT_DETAIL_REQUEST
        });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: actions.PRODUCT_DETAIL_SUCCESS,
            payload: data.product,
        });

    } catch (error) {
        dispatch({
            type: actions.PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        });

    }

}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actions.CLEAR_ERRORS,
    });

}