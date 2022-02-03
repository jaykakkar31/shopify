import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";
import ShopNavigator from "./productNavigator";
const NavigationContainer = (props) => {
	const navRef = useRef();
	// !! returns boolean
	const isAuth = useSelector((state) => !!state.authReducer.token);
	useEffect(() => {
		if (!isAuth) {
            //dispatch is method made available by shop navigator
			navRef.current.dispatch(NavigationActions.navigate({ routeName: "Auth" }));
		}
	}, [isAuth]);
	return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
