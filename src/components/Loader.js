import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#fff"/>
  </View>
)

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
})