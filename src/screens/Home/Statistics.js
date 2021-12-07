import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import SlideHeading from "../../components/Home/SlideHeading";
import StatsNumbers from "../../components/Home/StatsNumbers";

const Statistics = ({image, title, navigation}) => {
  return (
    <View style={styles.container}>
      <SlideHeading 
        title={title}
        image={image}
        navigation={navigation}
      />
      <View style={styles.content}>
        <StatsNumbers />
      </View>
    </View>
  )
}

export default Statistics;

const styles = StyleSheet.create({
  container: {
    paddingTop: 210,
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
})