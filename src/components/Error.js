import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/colors";
import { textStyles } from "../constants/textStyles";

const ErrorMessage = ({message}) => {
  const [title, text] = message.split(':');
  return (
    <View style={{...styles.container, opacity: message ? 1 : 0}}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHTDANGER,
    minHeight: 60,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    ...textStyles.subtitle,
    marginBottom: 6,
  },
  text: {
    ...textStyles.small,
  },
})