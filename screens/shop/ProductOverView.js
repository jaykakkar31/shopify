import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	FlatList,
	TouchableOpacity,
	Platform,
	ActivityIndicator,
	Text,
	Button,
	StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/productItem";
import { addToCart } from "../../store/actions/cart";
import { fetchProduct } from "../../store/actions/product";
import { Colors } from "../../constants/color";

const ProductOverView = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const dispatch = useDispatch();
	let products = useSelector((state) => state.productReducer.availableProduct);
	const [error, setError] = useState();
	const viewDetail = (id) => {
		props.navigation.navigate({
			routeName: "ProductDetail",
			params: { productId: id },
		});
	};

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchProduct());
		} catch (e) {
			setError(e.message);
		}
		setIsRefreshing(false);
	}, [isLoading, dispatch, error]);
	useEffect(() => {
		setIsLoading(true);
		loadProducts().then(() => {
			setIsLoading(false);
		});
	}, []);
	useEffect(() => {
		//if we change data in firebase so to fetch the change data
		const willFocusSub = props.navigation.addListener(
			"willFocus",
			loadProducts
		);
		return () => {
			willFocusSub.remove();
		};
	}, [loadProducts,dispatch]);
	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.load}>
				<Text style={styles.add}>
					No products found, maybe start adding some!
				</Text>
			</View>
		);
	}
	if (error) {
		return (
			<View style={styles.load}>
				<Text>{error}</Text>
				<Button
					title="Try Again!"
					onPress={loadProducts}
					color={Colors.primary}
				></Button>
			</View>
		);
	}
	if (isLoading) {
		return (
			<View style={styles.load}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	return (
		<FlatList
			onRefresh={loadProducts}
			refreshing={isRefreshing}
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					addToCart={() => {
						// props.navigation.navigate("CartScreen")
						dispatch(addToCart(itemData.item));
					}}
					selectNavigation={() => {
						viewDetail(itemData.item.id);
						// props.navigation.navigate("ProductDetail")
					}}
					admin={false}
					productId={itemData.item.id}
					props={props.navigation}
					title={itemData.item.title}
					price={Number(itemData.item.price)}
					imageUrl={itemData.item.imageUrl}
				></ProductItem>
			)}
		/>
	);
};

ProductOverView.navigationOptions = (navData) => {
	return {
		headerTitle: "All Products",
		headerLeft: () => (
			<TouchableOpacity
				onPress={() => {
					navData.navigation.toggleDrawer();
				}}
			>
				<View style={{ paddingLeft: 15 }}>
					<Ionicons name="ios-menu" size={23} color="white" />
				</View>
			</TouchableOpacity>
		),
		headerRight: () => (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					navData.navigation.navigate("CartScreen");
				}}
			>
				<View style={{ paddingRight: 15 }}>
					<Ionicons
						name={Platform.OS == "android" ? "md-cart" : "ios-cart"}
						color={"white"}
						size={23}
					/>
				</View>
			</TouchableOpacity>
		),
	};
};
const styles = StyleSheet.create({
	add: { fontFamily: "open-sans-bold", fontSize: 16 },
	load: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
export default ProductOverView;
