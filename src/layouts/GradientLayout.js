import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

const GradientLayout = ({children, style}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0.2}} 
      end={{x: 0, y: 1}}
      colors={[colors.ACCENT,'#fff']}
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
  }
})
