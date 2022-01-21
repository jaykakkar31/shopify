import React, { useEffect } from "react";
import { View, Image, Text, Button, Platform, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/productItem";
import { Colors } from "../../constants/color";
import { addToCart } from "../../store/actions/cart";
const ProductDetail = (props) => {
	const dispatch = useDispatch();

	const productId = props.navigation.getParam("productId");

	const products = useSelector((state) =>
		state.productReducer.availableProduct.find(
			(product) => product.id == productId
		)
	);
	useEffect(() => {
		props.navigation.setParams({ title: products.title });
	}, [products]);
	return (
		<View style={{ flex: 1 }}>
			<Image style={styles.image} source={{ uri: products.imageUrl }} />
			<View style={{ alignItems: "center", marginVertical: 10 }}>
				<Button
					title="Add to Cart"
					color={Colors.primary}
					onPress={() => {
						dispatch(addToCart(products));
						props.navigation.navigate("CartScreen");
					}}
				/>
			</View>
			<Text style={styles.price}>${products.price}</Text>
			<Text style={styles.description}>{products.description}</Text>
		</View>
	);
};

ProductDetail.navigationOptions = (navData) => {
	const title = navData.navigation.getParam("title");

	return { headerTitle: title };
};

const styles = StyleSheet.create({
	image: {
		height: 300,
		width: "100%",
	},
	price: {
		color: "#888",
		marginVertical: 20,
		fontSize: 20,
		textAlign: "center",
		fontFamily: "open-sans-bold",
	},
	description: {
		fontSize: 14,
		textAlign: "center",
		marginHorizontal: 20,
		fontFamily: "open-sans",
	},
});
export default ProductDetail;
