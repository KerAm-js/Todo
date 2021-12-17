import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";

const Task = ({name}) => {
  return (
    <View style={{...styles.container, ...shadow}}>
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity
        style={styles.button}
      >

      </TouchableOpacity>
    </View>
  )
}

export default Task;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.LIGHTBLUE,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    maxWidth: 260,
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.BLUE,
    backgroundColor: '#fff',
  },
})