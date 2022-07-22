import axios from "axios";
import * as actions from "../constant/productConstant";

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.ALL_PRODUCT_REQUEST
        });

        let refrenceLink = `/api/v1/products`;

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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actions.CLEAR_ERRORS,
    });

}