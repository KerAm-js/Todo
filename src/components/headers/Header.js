import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Todo
      </Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293559',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOpacity: .5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 35,
    marginTop: 35,
  },
})