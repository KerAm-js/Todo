import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";

const MyButton = ({type, title, onPress, disabled}) => {

  let borderColor = type === 'submit' ? colors.BLUE : colors.DANGER;
  let backgroundColor = type === 'submit' ? colors.LIGHTBLUE : colors.LIGHTDANGER;

  return (
    <TouchableOpacity
      style={{...styles.container, backgroundColor, borderColor}}
      onPress={onPress}
      disabled={disabled}
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
    ...textStyles.regular,
    textAlign: "center",
  }
})