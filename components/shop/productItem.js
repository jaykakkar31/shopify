import React from "react";
import {
	View,
	StyleSheet,
	Image,
	Text,
	Button,
	TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/color";
// import { Button } from "react-native-web";

const productItem = ({
	imageUrl,
	title,
	price,
	addToCart,
	viewDetail,
	admin,
	props,
	productId,
    editItem,deleteItem,selectNavigation
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.9}
				style={{ flex: 1 }}
				onPress={selectNavigation}
			>
				<View style={{ width: "100%", height: "60%" }}>
					<Image style={styles.image} source={{ uri: imageUrl }} />
				</View>
				<View style={{ alignItems: "center", marginVertical: 8 }}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.price}>${Number(price)}</Text>
				</View>
				{admin ? (
					<View style={styles.action}>
						<View style={{ width: 100 }}>
							<Button
								style={{ width: "100%", height: "100%" }}
								color={Colors.primary}
								title="Edit"
								onPress={editItem}
							/>
						</View>
						<View style={{ width: 100 }}>
							<Button
								color={Colors.primary}
								title="Delete"
								onPress={deleteItem}
							/>
						</View>
					</View>
				) : (
					<View style={styles.action}>
						<Button
							style={{ width: "100%", height: "100%" }}
							color={Colors.primary}
							title="View Detail"
							onPress={selectNavigation}
						/>
						<Button
							color={Colors.primary}
							title="Add to cart"
							onPress={addToCart}
						/>
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.26,
		shadowRadius: 10,
		elevation: 5,
		backgroundColor: "white",
		height: 300,
		margin: 20,
		borderRadius: 10,
		overflow: "hidden",
	},
	image: { width: "100%", height: "100%" },
	title: { fontSize: 18, marginVertical: 5, fontFamily: "open-sans-bold" },
	price: { fontSize: 14, color: "#888", fontFamily: "open-sans" },
	action: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
});
export default productItem;
