import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Platform,FlatList,TouchableOpacity } from "react-native";
// import {   } from "react-native-gesture-handler";

const cartList = ({ onRemove,qty,title,sum,deletable }) => {
	return (
		<View style={styles.cartItem}>
			<View style={styles.itemData}>
				<View style={{marginRight:10}}>
					<Text style={styles.qty}>{qty}</Text>
				</View>
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={styles.itemData}>
				<Text style={styles.amt}>${sum}</Text>

				{deletable && (
					<TouchableOpacity style={{marginLeft:10}} onPress={onRemove}>
						<Ionicons
							name={Platform.OS == "android" ? "md-trash" : "ios-trash"}
							size={23}
							color={"red"}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	cartItem: {
		padding: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	itemData: {
		flexDirection: "row",
		alignItems: "center",
        
	},
	qty: {
		fontFamily: "open-sans",
		color: "#888",
		fontSize: 16,
        marginRight:10
	},
	title: {
		fontSize: 16,
		fontFamily: "open-sans-bold",
	},
	amt: {
		fontSize: 16,
		fontFamily: "open-sans-bold",
	},
	del: { marginLeft: 20 },
});

export default cartList;
