import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, TouchableOpacity, View, Alert, Text } from "react-native";
// import {  } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/productItem";
import { deleteProduct } from "../../store/actions/product";
const UserPRoduct = (props) => {
	const productReducer = useSelector((state) => state.productReducer);
	const { userProducts } = productReducer;
	const dispatch = useDispatch();
	const deleteHandler = (id) => {
		Alert.alert("Are you sure?", "Do you really want to delete this item?", [
			{ text: "No", style: "default" },
			{
				text: "Yes",
				style: "destructive",
				onPress: () => {
					dispatch(deleteProduct(id));
				},
			},
		]);
	};

	if (userProducts.length == 0) {
		return (
			<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
				<Text style={{fontFamily:"open-sans-bold",fontSize:16}}>No products found, maybe start adding some!</Text>
			</View>
		);
	}
	return (
		<View>
			<FlatList
				data={userProducts}
				renderItem={(itemData) => {
					return (
						<ProductItem
							imageUrl={itemData.item.imageUrl}
							title={itemData.item.title}
							price={itemData.item.price}
							admin={true}
							deleteItem={() => deleteHandler(itemData.item.id)}
							editItem={() => {
								props.navigation.navigate({
									routeName: "Edit",
									params: {
										productId: itemData.item.id,
									},
								});
							}}
						/>
					);
				}}
			/>
		</View>
	);
};
UserPRoduct.navigationOptions = (navData) => {
	return {
		headerTitle: "Your Products",
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
				onPress={() => {
					navData.navigation.navigate("Edit");
				}}
			>
				<View style={{ paddingRight: 15 }}>
					<Ionicons name="ios-add" size={23} color="white" />
				</View>
			</TouchableOpacity>
		),
	};
};

export default UserPRoduct;
