import { SIGNIN, SIGNUP } from "../constants/constant";

export const signIn = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfryjE78R5xywDGdWnnJKLPbXFyLGx9sc",
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
			console.log(resData.localId, "SIGN In");

			dispatch({
				type: SIGNIN,
				token: resData.idToken,
				userId: resData.localId,
			});
		} catch (e) {
			console.log(e.message);
			throw e;
		}
	};
};

export const signUp = (email, password) => {
	console.log(email, password);
	return async (dispatch) => {
		try {
			const response = await fetch(
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfryjE78R5xywDGdWnnJKLPbXFyLGx9sc",
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

			dispatch({
				type: SIGNUP,
				payload: { token: resData.idToken, userId: resData.localId },
			});
		} catch (e) {
			console.log(e.message);
			throw e;
		}
	};
};
