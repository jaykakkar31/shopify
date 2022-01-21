import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	Button,
	Text,
	ActivityIndicator,
	Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../../constants/color";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../store/actions/auth";
const AuthScreen = (props) => {
	// <KEYBOARDAVOIDINGVIEW
	const [isSignUp, setIsSignUp] = useState(false);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [values, setValues] = useState({
		email: true,
		password: true,
	});
	const [cred, setCred] = useState({ email: "", password: "" });
	// const [password, setPassword] = useState("");

	useEffect(() => {
		if (error) {
			Alert.alert("An Error Occured!", error, [
				{
					text: "Okay",
					// style: "destructive",
				},
			]);
		}
	}, [error,dispatch]);

	const StateHandler = useCallback(
		(text, name) => {
			if (text.trim().length === 0) {
				setValues((prev) => {
					return { ...prev, [name]: false };
				});
			} else {
				if (name == "email") {
					const reg =
						/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (reg.test(text) == false) {
						setValues((prev) => {
							return { ...prev, email: false };
						});
					} else {
						console.log(reg.test(text));
						setValues((prev) => {
							return { ...prev, [name]: true };
						});
					}
				} else {
					setValues((prev) => {
						return { ...prev, [name]: true };
					});
				}
			}
		},
		[values]
	);
	//
	const submitHandler = async () => {
		if (values.email == true && values.password == true) {
			setIsLoading(true);
			try {
				if (isSignUp) {
					const data = await dispatch(signUp(cred.email, cred.password));
                    					console.log(data, "RESPONE");

				} else {
					const data = await dispatch(signIn(cred.email, cred.password));
					console.log(data, "RESPONE");
				}
				props.navigation.navigate("Shop");
			} catch (e) {
				setError(e.message);
				setIsLoading(false);
			}

			setCred({ email: "", password: "" });
		}
	};
	return (
		<LinearGradient style={styles.linGrad} colors={["#ffedff", "#ffe3ff"]}>
			<LinearGradient colors={["#ffe3ff", "#ffedff"]} style={styles.container}>
				<ScrollView style={{ flexGrow: 1 }}>
					<View style={styles.detail}>
						<Text style={styles.title}>Email</Text>
						<TextInput
							style={styles.input}
							value={cred.email}
							keyboardType="email-address"
							textContentType="emailAddress"
							placeholder="Enter email"
							autoCapitalize="none"
							onFocus={() => {
								StateHandler(cred.email, "email");
							}}
							errorMessage="Enter valid email address"
							onChangeText={(text) => {
								StateHandler(text, "email");
								setCred((prev) => {
									return { ...prev, email: text };
								});
							}}
						/>
						{!values.email && (
							<Text style={{ color: "red" }}>Please enter valid email</Text>
						)}
					</View>
					<View style={styles.detail}>
						<Text style={styles.title}>Password</Text>

						<TextInput
							style={styles.input}
							keyboardType="default"
							textContentType="password"
							secureTextEntry
							placeholder="Enter password"
							autoCapitalize="none"
							errorText="Enter valid password"
							onFocus={() => {
								StateHandler(cred.password, "password");
							}}
							value={cred.password}
							onChangeText={(text) => {
								StateHandler(text, "password");
								setCred((prev) => {
									return { ...prev, password: text };
								});
							}}
						/>
					</View>
					{!values.password && (
						<View style={{ marginBottom: 10 }}>
							<Text style={{ color: "red" }}>Plaese enter valid password </Text>
						</View>
					)}
					<View style={{ marginBottom: 10 }}>
						{isLoading ? (
							<ActivityIndicator size={"small"} color={Colors.primary} />
						) : (
							<Button
								title={isSignUp ? "Sign up" : "Login"}
								onPress={submitHandler}
								color={Colors.primary}
							/>
						)}
					</View>
					<Button
						onPress={() => {
							setIsSignUp((prev) => !prev);
						}}
						title={isSignUp ? "Switch to Login" : "Switch to Sign up"}
						color={Colors.primary}
					/>
				</ScrollView>
			</LinearGradient>
		</LinearGradient>
	);
};

AuthScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Authenticate",
	};
};
const styles = StyleSheet.create({
	container: {
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.26,
		shadowRadius: 10,
		elevation: 5,
		backgroundColor: "white",
		// height: 300,
		// alignItems:"center",
		width: "80%",
		maxWidth: 400,
		borderRadius: 10,
		overflow: "hidden",
		padding: 20,
	},
	input: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginVertical: 5,
	},
	detail: {
		marginVertical: 10,
	},
	title: {
		fontFamily: "open-sans-bold",
		// fontSize: 18,
	},
	linGrad: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
});

export default AuthScreen;
