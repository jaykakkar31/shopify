import { combineReducers, createStore ,applyMiddleware} from "redux";
import { productReducer } from "./reducers/productReducer";
// import { composeWithDevTools } from "redux-devtools-extension";
import {authReducer} from './reducers/auth'
import { cartReducer } from "./reducers/cartReducer";
import { orders } from "./reducers/order";
import thunk from 'redux-thunk'
const reducers = combineReducers({
	productReducer: productReducer,
	cartReducer: cartReducer,
	orders: orders,
    authReducer:authReducer
});

const store = createStore(reducers,applyMiddleware(thunk));
export default store;
