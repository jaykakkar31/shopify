import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/color";
import CartList from "../../components/shop/cartList";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";
const CartScreen = () => {
	const cartReducer = useSelector((state) => state.cartReducer);
	const { items, totalAmount } = cartReducer;
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const cartItems = useSelector((state) => {
		const transformedCartItems = [];
		for (const key in state.cartReducer.items) {
			transformedCartItems.push({
				productId: key,
				title: state.cartReducer.items[key].title,
				price: state.cartReducer.items[key].price,
				quantity: state.cartReducer.items[key].quantity,
				sum: state.cartReducer.items[key].sum,
			});
		}
		return transformedCartItems.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		);
	});

	const sendOrder = useCallback(async () => {
		setIsLoading(true);
		await dispatch(addOrder(cartItems, totalAmount));
		setIsLoading(false);
	}, [isLoading, dispatch]);
	useEffect(() => {
		// sendOrder();
	}, [isLoading]);
	// if (isLoading) {
	// 	return (
	// 		<View>
	// 			<ActivityIndicator />
	// 		</View>
	// 	);
	// }
	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total: <Text style={styles.amount}>${totalAmount}</Text>
				</Text>

				{isLoading ? (
					<View style={{ flex: 1, alignItems: "flex-end" }}>
						<ActivityIndicator color={Colors.primary} size="small" />
					</View>
				) : (
					<Button
						title="order now"
						disabled={cartItems.length === 0}
						onPress={sendOrder}
					/>
				)}
			</View>
			<FlatList
				data={cartItems}
				renderItem={(itemData) => (
					<CartList
						deletable
						qty={itemData.item.quantity}
						title={itemData.item.title}
						price={itemData.item.price}
						sum={itemData.item.sum}
						onRemove={() => {
							dispatch(removeFromCart(itemData.item.productId));
						}}
					/>
				)}
			/>
		</View>
	);
};

CartScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Your cart",
	};
};
const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		padding: 10,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.26,
		shadowRadius: 10,
		elevation: 5,
		backgroundColor: "white",
	},
	summaryText: {
		fontFamily: "open-sans",
		fontSize: 18,
	},
	amount: {
		color: Colors.primary,
		fontFamily: "open-sans-bold",
	},
});
export default CartScreen;
