import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";

const FooterSpace = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={{height: tabBarHeight + 40, backgroundColor: '#fff'}}>
    </View>
  )
}
  


export default FooterSpace;