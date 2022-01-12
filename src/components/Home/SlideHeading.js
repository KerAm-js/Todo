import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";

const SlideHeading = ({image, title, navigation, paddingTop}) => {
  return (
    <View style={{...styles.container, paddingTop: paddingTop <= 20 ? paddingTop + 10 : paddingTop + 5}}>
      <TouchableOpacity
        style={{...styles.backButton, top: paddingTop <= 20 ? paddingTop + 10 : paddingTop + 5}}
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
    ...textStyles.big,
    textAlign: "center",
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