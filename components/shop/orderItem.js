import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Colors } from "../../constants/color";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	FlatList,
	Button,
} from "react-native";
import CartItem from "./cartList";
// import {   } from "react-native-gesture-handler";
import moment from "moment";
const OrderItem = ({ amount, date, item }) => {
	const [showdetails, setShowDetails] = useState(false);
	return (
		<View style={styles.orderItem}>
			<View style={styles.summary}>
				<Text style={styles.totalAmount}>${amount}</Text>
				<Text style={styles.date}>{date.toString()}</Text>
			</View>
			<View style={{ flex: 1, alignItems: "center" ,marginVertical:10}}>
				<Button
					style={{}}
					color={Colors.primary}
					title={showdetails?"Hide Details":"Show details"}
					onPress={() => {
						setShowDetails((prevState) => !prevState);
					}}
				/>
			</View>
			{showdetails && (
				<View style={{ flex: 1, width: "100%" }}>
					{item.map((cartItem,index) => {
					
						return (
							<CartItem
                            key={index}
								qty={cartItem.quantity}
								title={cartItem.title}
								sum={cartItem.sum}
							/>
						);
					})}
				</View>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	orderItem: {
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: "white",
		margin: 20,
		padding: 10,
		alignItems: "center",
	},
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
        marginVertical:10,
        paddingHorizontal:10
		// marginBottom: 15,
	},
	totalAmount: {
		fontFamily: "open-sans-bold",
		fontSize: 16,
		color: "#000",
	},
	date: {
		fontSize: 16,
		fontFamily: "open-sans",
		color: "#888",
	},
});

export default OrderItem;
