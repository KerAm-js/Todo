import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

const HomeGreeting = () => {
  const containerPaddingTop = useSafeAreaInsets().top + 55 || 20 + 55;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <Text style={styles.username}>Амир,</Text>
      <Text style={styles.greeting}>добро пожаловать!</Text>
    </View>
  )
}

export default HomeGreeting;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.ACCENT,
    paddingHorizontal: 20,
  },
  username: {
    fontSize: 25,
    lineHeight: 25,
    marginBottom: 5,
    color: '#fff',
    fontWeight: '600'
  },
  greeting: {
    lineHeight: 20,
    fontSize: 18,
    color: '#fff',
  }
})