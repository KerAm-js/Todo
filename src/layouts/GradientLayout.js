import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../constants";

const GradientLayout = ({children, style}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 0}}
      colors={[colors.ACCENT,colors.ACCENT0_8]}
      style={{...styles.gradient, ...style}}
    >
     {children} 
    </LinearGradient>
  );
};

export default GradientLayout;

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  }
})
