import React from "react";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
import HomeSlider from "../../components/Home/HomeSlider";
import FooterSpace from "../../components/FooterSpace";
import HomeToday from "../../components/Home/HomeToday";
import HomeCurrentTask from "../../components/Home/HomeCurrentTask";
import HomeResults from "../../components/Home/HomeResult";
import HomeGreeting from "../../components/Home/HomeGreeting";
import HomeTasksCount from "../../components/Home/HomeTasksCount";

const Main = props => {
  return (
    <View style={styles.container}>
      <HomeGreeting />
      <ScrollView 
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <HomeSlider {...props} />
          <HomeToday />
          <HomeTasksCount />
          <HomeCurrentTask />
          <HomeResults />
        </View>
      </ScrollView>
    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#fff',
    paddingBottom: 280,
  },
  scroll: {
    paddingTop: Platform.OS === 'ios' ? 230 : 200,
  }
})