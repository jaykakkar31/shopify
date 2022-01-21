import { addToCart } from "../actions/cart";
import {
	ADD_ORDER,
	ADD_TO_CART,
	DELETE_ITEM,
	REMOVE_FROM_CART,
} from "../constants/constant";
import CartItems from "../../models/cartItem";
const initialState = {
	totalAmount: 0,
	items: {},
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const addedProduct = action.payload;
			const price = Number(addedProduct.price);
			const title = addedProduct.title;
			if (state.items[addedProduct.id]) {
				// already exist
				const updateProduct = new CartItems(
					Number(state.items[addedProduct.id].quantity) + 1,
					price,
					title,
					state.items[addedProduct.id].sum + price
				);
				return {
					...state,
					items: { ...state.items, [addedProduct.id]: updateProduct },
					totalAmount: state.totalAmount + price,
				};
			} else {
				const newItem = new CartItems(1, price, title, price);

				return {
					...state,
					items: { ...state.items, [addedProduct.id]: newItem },
					totalAmount: state.totalAmount + price,
				};
			}
		case REMOVE_FROM_CART: {
			const selectedItem = state.items[action.payload];
			const qty = selectedItem.quantity;
			let updatedItems;
			if (qty > 1) {
				const updateItem = new CartItems(
					selectedItem.quantity - 1,
					selectedItem.price,
					selectedItem.title,
					selectedItem.sum - selectedItem.price
				);
				updatedItems = { ...state.items, [action.payload]: updateItem };
			} else {
				updatedItems = { ...state.items };
				delete updatedItems[action.payload];
			}

			//  state.items.filter(
			// 	(product) => product.id == action.payload
			// );
			return {
				...state,
				items: updatedItems,
				totalAmount: state.totalAmount - selectedItem.price,
			};
		}
		case ADD_ORDER:
			return initialState;
		case DELETE_ITEM: {
			if (!state.items[action.payload]) {
				return state;
			}
			const updatedItem = { ...state.items };
			const itemTotal = state.items[action.payload].sum;
			delete updatedItem[action.payload];

			return {
				...state,
				items: updatedItem,
				totalAmount: state.totalAmount - itemTotal,
			};
		}
	}

	return state;
};
