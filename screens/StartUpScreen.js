import React, { useEffect } from "react";
import { View, AsyncStorage, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../constants/color";
import { authenticate } from "../store/actions/auth";

const StartUpScreen = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const tryLogin = async () => {
			const data = await AsyncStorage.getItem("userData");
			if (!data) {
				props.navigation.navigate("Auth");
				return;
			}
			const transformedData = JSON.parse(data);
			const { token, userId, expiration } = transformedData;
			const expirationDate = new Date(expiration);
			if (expirationDate <= new Date() || !token || !userId) {
				props.navigation.navigate("Auth");
				return;
			}
			// time starts from 1970 january 00:00
			//+ number in milli seconds

			let expirationTime = expirationDate.getTime() - new Date().getTime();
			await dispatch(authenticate(token, userId, expirationTime));

			props.navigation.navigate("Shop");
		};
		tryLogin();
	}, []);
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size={"large"} color={Colors.primary} />
		</View>
	);
};

export default StartUpScreen;
