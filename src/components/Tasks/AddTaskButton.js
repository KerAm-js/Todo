import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const AddTaskButton = ({showModal}) => {
  return (
    <View style={{...styles.container}}>
      <TouchableOpacity
        onPress={showModal}
        style={styles.button}
      >
        <Image 
          source={require('../../images/plusWhite.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}

export default AddTaskButton;

const styles = StyleSheet.create({
  container: {
    bottom: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.ACCENT,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",   
  },
  icon: {
    width: 20,
    height: 20,
  },
})