import Products from "../../models/product";
import * as Notification from "expo-notifications";
import Constants from "expo-constants";

import {
	CREATE_PRODUCT,
	DELETE_ITEM,
	SET_PRODUCTS,
	UPDATE_PRODUCT,
} from "../constants/constant";

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await Notification.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notification.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notification.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notification.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notification.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return token;
}

export const createProduct = (title, descp, imageUrl, price) => {
	return async (dispatch, getState) => {
		let ownerPushToken;
		await registerForPushNotificationsAsync().then((token) => {
            console.log(token,"TOKEN");
			ownerPushToken = token;
		});

		const token = getState().authReducer.token;
		const userId = getState().authReducer.userId;
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
						ownerId: userId,
						ownerPushToken: ownerPushToken,
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
					ownerPushToken: ownerPushToken,
				},
			});
		} catch (e) {
			throw e;
		}
	};
};

export const deleteProduct = (id) => {
	return async (dispatch, getState) => {
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
	return async (dispatch, getState) => {
		try {
			const userId = getState().authReducer.userId;
			console.log(getState().authReducer, "STATE");
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
			const loadedProducts = [];
			for (const key in resData) {
				loadedProducts.push(
					new Products(
						key,
						resData[key].ownerId,
                        resData[key].ownerPushToken,
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
				userProducts: loadedProducts.filter(
					(product) => product.ownerId === userId
				),
			});
		} catch (e) {
			throw e;
		}
	};
};

export const updateProduct = (title, description, imageUrl, id) => {
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;

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
