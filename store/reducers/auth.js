import { AUTHENTICATE, LOGOUT, SIGNIN, SIGNUP } from "../constants/constant";

const initialState = {
	token: null,
	userId: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {

		case SIGNIN: {
			return {
				token: action.payload.token,
				userId: action.payload.userId,
			};
		}
		case SIGNUP: {
			return {
				token: action.payload.token,
				userId: action.payload.userId,
			};
		}
        case AUTHENTICATE:return{
            token:action.token,
            userId:action.userId
        }
        case LOGOUT:return initialState
	}
    return state
};
