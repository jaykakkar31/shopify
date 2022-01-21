import { Platform } from "react-native";
import { createAppContainer,createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Colors } from "../constants/color";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProductDetail from "../screens/shop/ProductDetail";
import ProductOverView from "../screens/shop/ProductOverView";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import { Ionicons } from "@expo/vector-icons";
import UserPRoduct from "../screens/user/UserPRoduct";
import EditProduct from "../screens/user/EditProduct";
import AuthScreen from "../screens/user/AuthScreen";
const defualtNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	headerTitleStyle: {
		fontFamily: "open-sans-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: Platform.OS == "android" ? "white" : Colors.primary,
};

const productNavigator = createStackNavigator(
	{
		ProductOverView: ProductOverView,
		ProductDetail: ProductDetail,
		CartScreen: CartScreen,
		OrderScreen: OrderScreen,
	},

	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
			),
		},
		headerStyle: {
			backgroundColor: Colors.primary,
		},
		defaultNavigationOptions: defualtNavOptions,
	}
);

const orderNavigator = createStackNavigator(
	{
		Orders: OrderScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
			),
		},
	
		defaultNavigationOptions: defualtNavOptions,
	}
);

const adminNavigator = createStackNavigator(
	{
		User: UserPRoduct,
        Edit :EditProduct
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
			),
		},

		defaultNavigationOptions: defualtNavOptions,
	}
);
const shopNavigator = createDrawerNavigator(
	{
		Products: productNavigator,
		Orders: orderNavigator,
        Admin:adminNavigator
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
			labelStyle: {
				// marginTop: 40,
				fontFamily: "open-sans-bold",
				// fontSize: 18,
				fontFamily: "open-sans-bold",
			},
			itemsContainerStyle: {
				marginVertical: 50,
			},
		},
	}
);
const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defualtNavOptions,
	}
);

const MainNavigator = createSwitchNavigator(
	{
		Auth: AuthNavigator,
		Shop: shopNavigator,
	},

);
export default createAppContainer(MainNavigator);
