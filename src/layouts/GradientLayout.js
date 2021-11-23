import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

const GradientLayout = ({children, style}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 0.5}}
      colors={['rgba(41, 53, 89, 1)','rgba(73, 86, 123, 1)']}
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
