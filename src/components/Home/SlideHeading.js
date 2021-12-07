import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const SlideHeading = ({image, title, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../../images/back.png')} 
          style={styles.backImage}
        />
      </TouchableOpacity>
      <Image 
        style={styles.image}
        source={image}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default SlideHeading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: colors.ACCENT,
    height: '100%',
    width: '100%',
    alignItems: "center",
    paddingTop: 60,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    color: '#fff'
  },
  backImage: {
    width: 20,
    height: 20,
  },
  backButton: {
    justifyContent: "center",
    width: 50,
    height: 50,
    position: "absolute",
    top: 55,
    left: 10,
  },
})