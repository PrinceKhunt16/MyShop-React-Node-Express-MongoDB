import * as actions from "../constant/productConstant";

export const productsReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case actions.ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
        case actions.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
            }
        case actions.ALL_PRODUCT_FAIL:
            return {
                loading: false,
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