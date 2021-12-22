import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ViewingHeading = ({navigation, title}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 5 || 20 + 5;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <TouchableOpacity
        style={{...styles.backButton, top: containerPaddingTop}}
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
    left: 10,
  },
  title: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: "600",
    color: '#fff',
  },
})