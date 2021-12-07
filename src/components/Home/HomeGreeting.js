import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

const HomeGreeting = () => {
  return (
    <View style={styles.heading}>
      <Text style={styles.username}>Амир,</Text>
      <Text style={styles.greeting}>добро пожаловать!</Text>
    </View>
  )
}

export default HomeGreeting;

const styles = StyleSheet.create({
  heading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.ACCENT,
    paddingTop: 110,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  username: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600'
  },
  greeting: {
    fontSize: 20,
    color: '#fff',
  }
})