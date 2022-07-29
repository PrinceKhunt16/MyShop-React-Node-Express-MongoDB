import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducers, productsReducers } from "./reducers/productReducers";
import { forgotPasswordReducer, profileReducer, userReducers } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
    products: productsReducers,
    productDetail: productDetailsReducers,
    user: userReducers,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;