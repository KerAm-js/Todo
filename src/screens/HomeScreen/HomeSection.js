import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import GradientLayout from "../../layouts/GradientLayout";

const HomeSection = ({image, title}) => {
  return (
    <GradientLayout>
      <View style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.imageContainer}
        >
          <View style={styles.headingContainer}>
            <BlurView
              intensity={10}
              style={styles.blurContainer}
            >
              <Text style={styles.title}>
                {title}
              </Text>
            </BlurView> 
          </View>
        </ImageBackground>
      </View>
    </GradientLayout>
  )
}

export default HomeSection;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOpacity: .5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  imageContainer: {
    width: '100%',
    height: 360,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  headingContainer: {
    backgroundColor: 'rgba(41, 53, 89, 0.5)',
    borderRadius: 20,
    overflow: "hidden",
  },
  blurContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textAlign: "center"
  }
})