import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/colors";
import { textStyles } from "../constants/textStyles";

const Message = ({message, style, title}) => {
  const containerStyle = {
    ...styles.container,
  }
  return (
    <View style={{...containerStyle, ...style}}>
      {
        title 
          ? <Text style={styles.title}>{title}</Text>
          : null
      }
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    minHeight: 60,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    ...textStyles.regular,
    minHeight: 24,
  },
  title: {
    ...textStyles.subtitle,
    marginBottom: 10,
  }
})