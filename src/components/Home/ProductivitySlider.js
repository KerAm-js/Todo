import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";

const ProductivitySlider = ({slides}) => {
  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {
        slides.map(({id, active}, index) => {
          let style;
          
          if (active) {
            style = {
              ...styles.button,
              ...styles.buttonActive,
              ...shadow,
              marginLeft: index === 0 ? 20 : 0,
            }
          } else {
            style = {
              ...styles.button,
              marginLeft: index === 0 ? 20 : 0,
            }
          }

          return (
            <TouchableOpacity style={{...style}} key={index}>
              <Text style={styles.title}>{id}</Text>
            </TouchableOpacity>
          )})
      }
    </ScrollView>
  )
}

export default ProductivitySlider;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.BLUE,
    borderRadius: 15,
    backgroundColor: '#fff',
    minHeight: 50,
    width: 50,
    marginRight: 20,
  },
  buttonActive: {
    borderWidth: 0,
    backgroundColor: colors.LIGHTBLUE,
  },
  title: {
    fontSize: 18,
  },  
})