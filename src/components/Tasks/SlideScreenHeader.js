import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";

const SlideScreenHeader = ({navigation, title, paddingTop}) => {

  return (
    <View style={{...styles.container, paddingTop}}>
      <TouchableOpacity
        style={{...styles.backButton, top: paddingTop}}
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

export default SlideScreenHeader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: '100%',
    width: '100%',
    backgroundColor: colors.ACCENT,
    alignItems: "center",
    paddingBottom: 10,
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
    ...textStyles.big,
    color: '#fff',
  },
})