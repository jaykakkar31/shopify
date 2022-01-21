import { HeaderButton } from "react-navigation-header-buttons";
import React from 'react'
import { Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/color";
const headerButtons = (props) => {
    return (
        <HeaderButton IconComponent={Ionicons} {...props} iconSize={23} color={Platform.OS=="android"?"white":Colors.primary}/>
            
    )
}

export default headerButtons
