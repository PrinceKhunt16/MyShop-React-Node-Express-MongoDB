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

// New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: actions.NEW_REVIEW_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: actions.NEW_REVIEW_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: actions.NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Products For Admin
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.ADMIN_PRODUCT_REQUEST
        });

        const { data } = await axios.get("/api/v1/admin/products");

        dispatch({
            type: actions.ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        });

    } catch (error) {

        dispatch({
            type: actions.ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });

    }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: actions.NEW_PRODUCT_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/admin/product/new`,
            productData,
            config
        );

        dispatch({
            type: actions.NEW_PRODUCT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: actions.NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actions.CLEAR_ERRORS,
    });
}