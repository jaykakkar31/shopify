import { ADD_ORDER,SET_ORDERS } from "../constants/constant";
import Order from "../../models/orders";
const initialState = {
	order: [],
};

export const orders = (state = initialState, action) => {
	switch (action.type) {
        case SET_ORDERS:{
            return { order: action.payload };

        }
		case ADD_ORDER: {
            
			const newOrder = new Order(
				action.payload.id,
				action.payload.item,
				action.payload.total,
				action.payload.date
			);
			return {
				...state,
				order: state.order.concat(newOrder),
			};
		}
	}
	return state;
};
