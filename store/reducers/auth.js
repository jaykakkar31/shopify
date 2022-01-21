import { SIGNIN, SIGNUP } from "../constants/constant";

const initialState = {
	token: null,
	userId: null,
};

export const authReducer = (state = initialState, action) => {
    // console.log(action.type,"TYPE");
	switch (action.type) {
        
		case SIGNIN: {
			console.log(action, "REDUCER AUTH");
			return {
				token: action.token,
				userId: action.userId,
			};
		}
		case SIGNUP: {
			return {
				token: action.token,
				userId: action.userId,
			};
		}
	}
    return state
};
