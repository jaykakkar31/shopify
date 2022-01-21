import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/shop/orderItem";
import { Colors } from "../../constants/color";
import { fetchOrders } from "../../store/actions/order";
const OrderScreen = () => {
	const orders = useSelector((state) => state.orders.order);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		dispatch(fetchOrders()).then((res) => {
			setIsLoading(false);
		});
	}, [dispatch]);

	return isLoading ? (
		<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
			<ActivityIndicator color={Colors.primary} size={"large"}  />
		</View>
	) : (
		<View>
			{/* <Text>ORDER</Text> */}
			<FlatList
				data={orders}
				renderItem={(itemData) => {
					return (
						<OrderItem
							amount={itemData.item.totalAmount}
							item={itemData.item.items}
							date={itemData.item.readableDate}
						/>
					);
				}}
			/>
		</View>
	);
};

OrderScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Your orders",
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
	};
};
export default OrderScreen;
