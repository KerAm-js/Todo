import React from "react";
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback, Image, Text, Platform, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import { androidShadow, cardShadow } from "../../constants/shadows";
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
          slides.map(({name, image, title}, index) => {
            if (Platform.OS === 'ios') {
              return (
                <TouchableWithoutFeedback
                  style={{ ...styles.slideContent, marginLeft: index === 0 ? 20 : 0,}}
                  key={index}
                  onPress={
                    () => navigation.navigate(name)
                  }
                >
                  <View style={{...cardShadow}}>
                    <View style={{ ...styles.slideContent, marginLeft: index === 0 ? 20 : 0}}>
                      <Text style={styles.title}>{title}</Text>
                      <Image 
                        source={image}
                        style={styles.image}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            } else {
              return (
                <View 
                  key={index} 
                  style={{...styles.androidWrapper, ...androidShadow, marginLeft: index === 0 ? 20 : 0,}}
                >
                  <TouchableWithoutFeedback
                    onPress={
                      () => navigation.navigate(name)
                    }
                  >
                    <View style={{ ...styles.slideContentAndroid}}>
                      <Text style={styles.title}>{title}</Text>
                      <Image 
                        source={image}
                        style={styles.image}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )
            }
          })
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
    marginTop: Platform.OS === 'ios' ? -40 : 0,
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
  androidWrapper: {
    marginTop: 20,
    marginBottom: 45,
    overflow: "hidden",
    height: 200, 
    width: 200,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  slideContent: {
    marginBottom: 45,
    alignItems: 'center',
    overflow: "hidden",
    height: 200, 
    width: 200,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  slideContentAndroid: {
    alignItems: 'center',
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