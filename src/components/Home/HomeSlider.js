import React from "react";
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback, Image, Text, Platform, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";


const HomeSlider = ({navigation, slides}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToEnd={false}
        style={styles.scroll}
      >
        {
          slides.map(({name, image, title}, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={
                () => navigation.navigate(name)
              }
            >
              <View style={{...shadow}}>
                <View style={{ ...styles.slideContent, marginLeft: index === 0 ? 20 : 0,}}>
                  {/* <BlurView 
                    intensity={100}
                    style={{...styles.slideBlur}}
                  > */}
                    
                    <Text style={styles.title}>{title}</Text>
                    <Image 
                      source={image}
                      style={styles.image}
                    />
                  {/* </BlurView> */}
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </ScrollView>
    </View>
    
  );
};

export default HomeSlider;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scroll: {
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: Platform.OS === 'ios' ? -40 : 20,
  },
  image :{
    marginTop: 20,
    width: 70,
    height: 70,
  },
  slideBlur: { 
    width: '100%',
    height: '100%', 
    marginRight: 20,
    alignItems: "center",
  },
  slideContent: {
    alignItems: 'center',
    overflow: 'hidden',
    height: 200, 
    width: 200,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: colors.BORDER_COLOR_ANDROID,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
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
    marginTop: 30,
    color: colors.ACCENT,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
  },
})