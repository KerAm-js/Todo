import React from "react";
import { View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, ImageBackground } from "react-native";
import InfoBlock from "../../components/InfoBlock";
import HomeSlider from "../../components/HomeSlider";
import GradientLayout from "../../layouts/GradientLayout";

const infoBlocks = [
  {
    title: "Задачи на сегодня",
    subtitle: new Date().toLocaleDateString(),
    value: 5,
  },
  {
    title: "Просрочено",
    value: 1,
    meaning: 'danger',
  }
]

const HomeMain = props => {
  return (
    <GradientLayout>
      <View style={styles.container}>
        <HomeSlider {...props} />
        <View style={styles.content}>
          {
            infoBlocks.map((block, index) => (
              <InfoBlock key={index} {...block} />
            ))
          }
        </View>
      </View>
    </GradientLayout>
  )
}

export default HomeMain;

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
  },
  content: {
    paddingHorizontal: 30,
  }
})