import { AUTHENTICATE, LOGOUT, SIGNIN, SIGNUP } from "../constants/constant";
import { AsyncStorage } from "react-native";
const API_KEY = "AIzaSyBfryjE78R5xywDGdWnnJKLPbXFyLGx9sc";
let timer;
export const authenticate = (token, userId, expiryTime) => {
	return async (dispatch) => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: AUTHENTICATE, userId: userId, token: token });
	};
};

// Auto Logout
const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

// Auto Logout
const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

export const logout = () => {
	return async (dispatch) => {
		clearLogoutTimer();
		AsyncStorage.removeItem("userData");
		dispatch({ type: LOGOUT });
	};
};
export const signIn = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
						returnSecureToken: true,
					}),
				}
			);
			if (!response.ok) {
				const errorResData = await response.json();
				const errorId = errorResData.error.message;
				let message = "Something went wrong!";
				if (errorId === "EMAIL_NOT_FOUND") {
					message = "This email could not be found!";
				} else if (errorId === "INVALID_PASSWORD") {
					message = "This password is not valid!";
				}
				throw new Error(message);
			}
			const resData = await response.json();

			dispatch(
				authenticate(
					resData.idToken,
					resData.localId,
					parseInt(resData.expiresIn) * 1000
				)
				// payload: { token: resData.idToken, userId: resData.localId },
				// 				payload: authenticate(resData.idToken,resData.localId),
			);
			const expirationDate = new Date(
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			);
			saveDataToStorage(resData.idToken, resData.localId, expirationDate);
		} catch (e) {
			throw e;
		}
	};
};

export const signUp = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
						returnSecureToken: true,
					}),
				}
			);
			if (!response.ok) {
				const errorResData = await response.json();
				const errorId = errorResData.error.message;
				let message = "Something went wrong!";
				if (errorId === "EMAIL_EXISTS") {
					message = "This email exists already!";
				}
				throw new Error(message);
			}
			const resData = await response.json();
			dispatch(
				authenticate(
					resData.idToken,
					resData.localId,
					parseInt(resData.expiresIn) * 1000
				)

				// payload: { token: resData.idToken, userId: resData.localId },
			);
			// converting sec to milli sec
			const expirationDate = new Date(
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			);
			saveDataToStorage(resData.idToken, resData.localId, expirationDate);
		} catch (e) {
			throw e;
		}
	};
};

const saveDataToStorage = (token, userId, expiration) => {
	AsyncStorage.setItem(
		"userData",
		JSON.stringify({
			token: token,
			userId: userId,
			expiration: expiration.toISOString(),
		})
	);
};
