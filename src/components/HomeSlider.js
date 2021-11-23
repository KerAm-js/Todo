import React from "react";
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback, ImageBackground, Text } from "react-native";
import { BlurView } from "expo-blur";

const HomeSlider = ({navigation, slides}) => {
  return (
    <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToEnd={false}
          style={styles.slides}
        >
          {
            slides.map(({name, image, slideStyle, title}, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate(name)}
              >
                <View style={styles.imageLayout}>
                  <ImageBackground 
                    resizeMode="cover"
                    style={{...styles.imageContainer, ...slideStyle}}
                    source={image}
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
              </TouchableWithoutFeedback>
            ))
          }
        </ScrollView>
  );
};

export default HomeSlider;

const styles = StyleSheet.create({
  slides: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  imageLayout: { 
    shadowColor: '#000',
    shadowOpacity: .5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  headingContainer: {
    backgroundColor: 'rgba(41, 53, 89, 0.5)',
    borderRadius: 20,
    overflow: "hidden",
  },
  blurContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textAlign: "center"
  }
})