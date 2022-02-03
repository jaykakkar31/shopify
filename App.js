import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";
import ProductNavigator from "./navigation/productNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import NavigationContainer from "./navigation/NavigationContainer";
import * as Notification from "expo-notifications";
const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};
enableScreens();

Notification.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});
export default function App() {
	LogBox.ignoreLogs(["Warning: ..."]);
	LogBox.ignoreAllLogs();

	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<NavigationContainer />
			</Provider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
