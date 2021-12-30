import React from "react";
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback, Image, Text, Platform } from "react-native";
import { colors } from "../../constants/colors";
import { cardShadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";


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
              <View style={{...cardShadow}}>
                <View style={{ ...styles.slideContent, marginLeft: index === 0 ? 20 : 0,}}>
                  <Text style={styles.title}>{title}</Text>
                  <Image 
                    source={image}
                    style={styles.image}
                  />
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
    paddingBottom: 45,
    marginTop: Platform.OS === 'ios' ? -40 : 10,
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
    backgroundColor: Platform.OS === 'ios' ? "#fff" : colors.LIGHTBLUE,
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
    ...textStyles.subtitle,
    marginTop: 30,
    color: colors.ACCENT,
  },
})