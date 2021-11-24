import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { shadowStyles } from "../../../constants";

const Header = () => {
  return (
    <View style={{...styles.container, ...shadowStyles}}>
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
  },
  title: {
    color: '#fff',
    fontSize: 35,
    marginTop: 35,
  },
})