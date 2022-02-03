import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
	Text,
	View,
	ScrollView,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	Button,
} from "react-native";
import { set } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/color";
import { createProduct, updateProduct } from "../../store/actions/product";
const EditProduct = (props) => {
	const productId = props.navigation.getParam("productId");
	const products = useSelector((state) =>
		state.productReducer.userProducts.find((product) => product.id == productId)
	);
	const [values, setValues] = useState({
		title: true,
		imageUrl: true,
		description: true,
		price: true,
	});
	const [title, setTitle] = useState(products ? products.title : "");
	const [imageUrl, setImageUrl] = useState(products ? products.imageUrl : "");
	const [description, setDescription] = useState(
		products ? products.description : ""
	);
	const [price, setPrice] = useState(products ? products.price : "");
	const [titleState, setTitleState] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			Alert.alert("An error occured!", error, [{ text: "Okay" }]);
		}
	}, [error]);

	const submitHandler = useCallback(async () => {
		if (
			title.trim().length == 0 &&
			imageUrl.trim().length == 0 &&
			description.trim().length == 0
		) {
			Alert.alert("Fields empty", "Required fields cannot be empty!", [
				{
					text: "Okay",
					style: "destructive",
					onPress: () => {
						return;
					},
				},
			]);
		} else {
			if (title.trim().length < 3) {
				Alert.alert("Title not valid", "Title should be atleast 6 characters", [
					{
						text: "Okay",
						style: "destructive",
						onPress: () => {
							return;
						},
					},
				]);
			} else if (description.trim().length < 3) {
				Alert.alert(
					"Description not valid",
					"Description should be atleast 6 characters",
					[
						{
							text: "Okay",
							style: "destructive",
							onPress: () => {
								return;
							},
						},
					]
				);
			} else {
				setIsLoading(true);
				setError(null);
				try {
					if (productId) {
						await dispatch(
							updateProduct(title, description, imageUrl, productId)
						);
						setIsLoading(false);
					} else {
                        
						dispatch(createProduct(title, description, imageUrl, price));
					}
					props.navigation.goBack();
				} catch (e) {
					setError(e.message);
				}
			}
		}
        setIsLoading(false)
	}, [
		dispatch,
		productId,
		title,
		price,
		imageUrl,
		description,
		error,
		isLoading,
	]);
	const StateHandler = (text, value) => {
		if (text.trim().length === 0) {
			setValues((prev) => {
				return { ...prev, [value]: false };
			});
		} else {
			setValues((prev) => {
				return { ...prev, [value]: true };
			});
		}
	};

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

    
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	return (
		<ScrollView>
			<View style={{ margin: 20 }}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						placeholder="Enter title ..."
						onChangeText={(text) => {
							StateHandler(text, "title");
							setTitle(text);
						}}
						autoCorrect
						autoCapitalize="sentences"
						returnKeyType="next"
						onFocus={() => {
							StateHandler(title, "title");
						}}
					/>
					{!values.title && (
						<Text style={{ color: "red" }}>Title can't be empty</Text>
					)}
				</View>
				<View>
					<Text style={styles.label}>Image Url</Text>
					<TextInput
						placeholder="Enter image url ..."
						value={imageUrl}
						style={styles.input}
						onFocus={() => {
							StateHandler(imageUrl, "imageUrl");
						}}
						onChangeText={(text) => {
							StateHandler(text, "imageUrl");

							setImageUrl(text);
						}}
					/>
					{!values.imageUrl && (
						<Text style={{ color: "red" }}>ImageUrl can't be empty</Text>
					)}
				</View>
				{!products && (
					<View>
						<Text style={styles.label}>Price</Text>
						<TextInput
							onFocus={() => {
								StateHandler(price, "price");
							}}
							placeholder="Enter price ..."
							value={price.toString()}
							keyboardType="decimal-pad"
							style={styles.input}
							onChangeText={(text) => {
								StateHandler(text, "price");

								setPrice(text);
							}}
						/>
						{!values.price && (
							<Text style={{ color: "red" }}>Price can't be empty</Text>
						)}
					</View>
				)}

				<View>
					<Text style={styles.label}>Description</Text>
					<TextInput
						onFocus={() => {
							StateHandler(description, "description");
						}}
						placeholder="Enter description ..."
						value={description}
						style={styles.input}
						onChangeText={(text) => {
							StateHandler(text, "description");
							setDescription(text);
						}}
						maxLength={100}
						autoCorrect
					/>
					{!values.description && (
						<Text style={{ color: "red" }}>Description can't be empty</Text>
					)}
				</View>
			</View>
		</ScrollView>
	);
};
EditProduct.navigationOptions = (navData) => {
	const submit = navData.navigation.getParam("submit");
	return {
		headerTitle: navData.navigation.getParam("productId")
			? "Edit Product"
			: "Add Product",
		headerRight: () => (
			<TouchableOpacity onPress={submit}>
				<View style={{ paddingRight: 15 }}>
					<Ionicons name="ios-checkmark" size={23} color="white" />
				</View>
			</TouchableOpacity>
		),
	};
};
const styles = StyleSheet.create({
	formControl: { width: "100%" },
	label: {
		fontSize: 16,
		fontFamily: "open-sans-bold",
		marginVertical: 8,
	},
	input: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		// paddingVertical: 5,
		paddingHorizontal: 3,
	},
});

export default EditProduct;
