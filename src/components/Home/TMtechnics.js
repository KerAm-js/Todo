import React, { cloneElement } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";

const TMtechnics = ({technics, activeSlide, setActiveSlide}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          technics.map(({id, name}, index) => {
            
            let style;

            if (activeSlide === id) {
              style = {
                ...styles.button,
                ...styles.buttonActive,
                marginLeft: index === 0 ? 20 : 0,
              }
            } else {
              style = {
                ...styles.button,
                marginLeft: index === 0 ? 20 : 0,
              }
            }

            return (
              <TouchableOpacity 
                style={style} 
                key={index}
                onPress={() => setActiveSlide(id)}
              >
                <Text style={styles.technicName}>{name}</Text>
              </TouchableOpacity>
            )}
          )
        }
      </ScrollView>
    </View>
  )
}

export default TMtechnics;

const styles = StyleSheet.create({
  container: {
    minHeight: 35,
  },
  scroll: {
    paddingBottom: 10,
  },
  button: {
    marginRight: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    minHeight: 45,
    borderWidth: 1,
    borderColor: colors.BLUE,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  buttonActive: {
    backgroundColor: colors.LIGHTBLUE,
    borderColor: colors.LIGHTBLUE
  },
  technicName: {
    fontSize: 18,
  },
})