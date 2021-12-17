import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../constants/colors";

const MyButton = ({type, title, onPress}) => {

  const borderColor = type === 'submit' ? colors.BLUE : colors.DANGER;
  const backgroundColor = type === 'submit' ? colors.LIGHTBLUE : colors.LIGHTDANGER;

  return (
    <TouchableOpacity
      style={{...styles.container, backgroundColor, borderColor}}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default MyButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    minHeight: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  }
})