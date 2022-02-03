import Orders from "../../models/orders";
import { ADD_ORDER, SET_ORDERS } from "../constants/constant";

export const fetchOrders = () => {
	return async (dispatch, getState) => {
		try {
			const userId = getState().authReducer.userId;
			const response = await fetch(
				`https://native-shop-cd386-default-rtdb.firebaseio.com/orders/${userId}.json`,
				{
					method: "GET",
				}
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const resData = await response.json();
			const loadedOrders = [];
			for (const key in resData) {
				loadedOrders.push(
					new Orders(
						key,
						resData[key].cartItems,

						resData[key].totalAmount,
						new Date(resData[key].date)
					)
				);
			}
			// for (const key in resData) {
			// 	loadedProducts.push(
			// 		new Products(
			// 			key,
			// 			"u1",
			// 			resData[key].title,
			// 			resData[key].imageUrl,
			// 			resData[key].description,
			// 			resData[key].price
			// 		)
			// 	);
			// }

			dispatch({
				type: SET_ORDERS,
				payload: loadedOrders,
			});
		} catch (e) {
			throw e;
		}
	};
};

export const addOrder = (cartItems, totalAmount) => {
	const date = new Date();
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;
		const userId = getState().authReducer.userId;
		try {
			const response = await fetch(
				`https://native-shop-cd386-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
				{
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						cartItems: cartItems,
						totalAmount: totalAmount,
						date: date.toISOString(),
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const resData = await response.json();
			dispatch({
				type: ADD_ORDER,
				payload: {
					id: resData.name,
					items: cartItems,
					totalAmount: totalAmount,
					date: date,
				},
			});

			try {
				for (const item of cartItems) {
                    		const ownerPushToken = item.ownerPushToken;

					await fetch("https://exp.host/--/api/v2/push/send", {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Accent-Encoding": "gzip,deflate",
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							to: ownerPushToken,
							data: { extraData: "some data" },
							title: "Order was placed",
							body: item.title,
						}),
					});
				}
			} catch (e) {
				console.log(e);
			}
		} catch (e) {
			throw e;
		}
	};
};
