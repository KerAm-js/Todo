import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

const SlideHeading = ({image, title, navigation}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 10 || 20 + 10;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop + 5}}>
      <TouchableOpacity
        style={{...styles.backButton, top: containerPaddingTop}}
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
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    lineHeight: 30,
    color: '#fff'
  },
  backImage: {
    width: 20,
    height: 20,
  },
  backButton: {
    width: 50,
    height: 20,
    position: "absolute",
    left: 10,
  },
})