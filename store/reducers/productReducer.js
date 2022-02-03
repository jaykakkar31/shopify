import PRODUCTS from "../../data/dummy-data";
import Products from "../../models/product";
import {
	CREATE_PRODUCT,
	DELETE_ITEM,
	UPDATE_PRODUCT,
	SET_PRODUCTS,
} from "../constants/constant";
const initialState = {
	availableProduct: [],
	userProducts: [],
};

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
            console.log(action.userProducts,"REDUCER");
			return {
				availableProduct: action.payload,
				userProducts: action.userProducts
				
			};
		case CREATE_PRODUCT:
			const newProduct = new Products(
				action.payload.id,
				action.payload.ownerId,
                action.payload.ownerPushToken,
				action.payload.title,
				action.payload.imageUrl,
				action.payload.description,

				action.payload.price
			);
			return {
				...state,
				availableProduct: state.availableProduct.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct),
			};
		case UPDATE_PRODUCT:
			const index = state.userProducts.findIndex(
				(prod) => prod.id == action.pid
			);
			const updateProduct = new Products(
				action.pid,
				state.userProducts[index].ownerId,
                state.userProducts[index].ownerPushToken,
				action.payload.title,
				action.payload.imageUrl,
				action.payload.description,

				state.userProducts[index].price
			);
			const products = [...state.userProducts];
			products[index] = updateProduct;

			const availProdIndex = state.availableProduct.findIndex(
				(prod) => prod.id == action.pid
			);
			const updateAvailabelProd = [...state.availableProduct];
			updateAvailabelProd[availProdIndex] = updateProduct;
			return {
				...state,
				availableProduct: updateAvailabelProd,
				userProducts: products,
			};

		case DELETE_ITEM:
			return {
				...state,
				userProducts: state.userProducts.filter(
					(product) => product.id !== action.payload
				),
				availableProduct: state.availableProduct.filter(
					(product) => product.id !== action.payload
				),
			};
	}
	return state;
};
