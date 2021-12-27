import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const AddButton = ({onPress}) => {
  return (
    <View style={{...styles.container}}>
      <TouchableOpacity
        onPress={onPress}
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

export default AddButton;

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