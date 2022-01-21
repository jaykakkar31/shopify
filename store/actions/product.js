import Products from "../../models/product";
import {
	CREATE_PRODUCT,
	DELETE_ITEM,
	SET_PRODUCTS,
	UPDATE_PRODUCT,
} from "../constants/constant";

export const deleteProduct = (id) => {
	return async (dispatch,getState) => {
                        const token = getState().auth.token;

		try {
			const response = await fetch(
				`https://native-shop-cd386-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			await response.json();

			dispatch({ type: DELETE_ITEM, payload: id });
		} catch (e) {
			throw e;
		}
	};
};
export const fetchProduct = () => {
	return async (dispatch,getState) => {
		try {
            const userId=getState().auth.userId
			const response = await fetch(
				"https://native-shop-cd386-default-rtdb.firebaseio.com/products.json",
				{
					method: "GET",
					headers: { "content-type": "application/json" },
				}
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const resData = await response.json();
            console.log(resData,"FETCh");
			const loadedProducts = [];
			for (const key in resData) {
				loadedProducts.push(
					new Products(
						key,
						"u1",
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				);
			}
			dispatch({
				type: SET_PRODUCTS,
				payload: loadedProducts,
                userProducts:loadedProducts.filter((product)=>product.ownerId===userId)
			});
		} catch (e) {
			throw e;
		}
	};
};
export const createProduct = (title, descp, imageUrl, price, id) => {
	//async use because of thunk

	return async (dispatch,getState) => {
                const token = getState().auth.token;
const userId=getState().auth.userId
		try {
			const response = await fetch(
				`https://native-shop-cd386-default-rtdb.firebaseio.com/products.json?auth=${token}`,
				{
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						title: title,
						description: descp,
						imageUrl: imageUrl,
						price: price,
                        ownerId:userId
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const resData = await response.json();
			dispatch({
				type: CREATE_PRODUCT,
				// pid: id,
				payload: {
					id: resData.name,
					title: title,
					description: descp,
					imageUrl: imageUrl,
					price: price,
					ownerId: userId,
				},
			});
		} catch (e) {
			throw err;
		}
	};
};
export const updateProduct = (title, description, imageUrl, id) => {
	return async (dispatch,getState) => {
                const token = getState().auth.token;
                console.log(getState());

		try {
			const response = await fetch(
				`https://native-shop-cd386-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
				{
					method: "PATCH",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						title: title,
						description: description,
						imageUrl: imageUrl,
					}),
				}
			);
			if (!response.ok) {
                
				throw new Error("Something went wrong!");
			}
			const resData = await response.json();
			// Modern javsscript
			dispatch({
				type: UPDATE_PRODUCT,
				pid: id,
				payload: { title, description, imageUrl },
			});
		} catch (e) {
			throw e;
		}
	};
};
