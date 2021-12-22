import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "./constants/colors";

const CheckInput = ({state, setState, title}) => {

  let borderColor = colors.BLUE;

  if (state) {
    borderColor = colors.SUCCESS;
  } else {
    borderColor = colors.BLUE;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity 
        style={{...styles.button, borderColor}}
        onPress={() => setState(!state)}
      >
        {
          state 
          ? <View style={styles.circle}></View>
          : null
        }
      </TouchableOpacity>
    </View>
  )
}

export default CheckInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.SUCCESS,
  },
  
})