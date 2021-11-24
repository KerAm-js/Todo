import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const HomeSlideHeader = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.backButton}
      >
        <Image 
          source={require('../../images/back.png')}
          style={styles.backImage}
        />
      </TouchableOpacity>
      
      <Text style={styles.title}>
        Todo
      </Text>
    </View>
  )
}

export default HomeSlideHeader;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 90,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  backButton: {
    position: "absolute",
    left: 30,
    bottom: 0,
    width: 40,
    height: 40
  },
  backImage: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff'
  }
})