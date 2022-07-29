import * as actions from "../constant/productConstant";

export const productsReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case actions.ALL_PRODUCT_REQUEST:
        case actions.ADMIN_PRODUCT_REQUEST:
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
        case actions.ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }; 
        case actions.ALL_PRODUCT_FAIL:
        case actions.ADMIN_PRODUCT_FAIL:
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

export const productDetailsReducers = (state = { product: {} }, action) => {
    switch (action.type) {
        case actions.PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case actions.PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case actions.PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case actions.NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case actions.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        case actions.NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
