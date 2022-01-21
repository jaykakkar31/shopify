import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/constant";

export const addToCart = (items) => {
	return { type: ADD_TO_CART, payload: items };
};

export const removeFromCart = (productId) => {
	return { type: REMOVE_FROM_CART, payload: productId };
};
