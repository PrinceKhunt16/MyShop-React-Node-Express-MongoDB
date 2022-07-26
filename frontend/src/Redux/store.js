import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducers, productsReducers } from "./reducers/productReducers";
import { userReducers } from "./reducers/userReducers";

const reducer = combineReducers({
    products: productsReducers,
    productDetail: productDetailsReducers,
    user: userReducers,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;