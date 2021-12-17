import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { colors } from "../constants/colors";

const ViewingHeading = ({navigation, title}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image 
          style={styles.backImage}
          source={require('../../images/back.png')}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default ViewingHeading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: '100%',
    width: '100%',
    backgroundColor: colors.ACCENT,
    paddingTop: 55,
    alignItems: "center"
  },
  backImage: {
    width: 20,
    height: 20,
  },
  backButton: {
    width: 50,
    height: 20,
    position: "absolute",
    top: 55,
    left: 10,
  },
  title: {
    fontSize: 25,
    color: '#fff',
  },
})