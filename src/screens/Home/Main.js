import React from "react";
import { View, ScrollView, StyleSheet, StatusBar, Platform } from "react-native";
import HomeSlider from "../../components/Home/HomeSlider";
import HomeToday from "../../components/Home/HomeToday";
import HomeCurrentTask from "../../components/Home/HomeCurrentTask";
import HomeResults from "../../components/Home/HomeResult";
import HomeGreeting from "../../components/Home/HomeGreeting";
import HomeTasksCount from "../../components/Home/HomeTasksCount";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabScreenHeader from "../../components/headers/TabScreenHeader";
import HomeExpiredTasks from "../../components/Home/HomeExpiredTasks";


const Main = ({navigation, slides, tasks, currentTasks, completeTask, showTaskDetails, expiredTasks}) => {
  const scrollPaddingTop = Platform.OS === 'ios' ? useSafeAreaInsets().top + 160 : useSafeAreaInsets().top + 120;
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
      />
      <TabScreenHeader title="Daily Planner"/>
      <HomeGreeting />
      <ScrollView 
        style={{...styles.scroll, paddingTop: scrollPaddingTop}}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <HomeSlider {...{navigation, slides}} />
          <HomeToday />
          <HomeTasksCount 
            count={tasks.length} 
            navigation={navigation}
          />
          <HomeExpiredTasks 
            expiredTasks={expiredTasks} 
            completeTask={completeTask} 
            showTaskDetails={showTaskDetails}
            navigation={navigation}
          />
          <HomeCurrentTask 
            currentTasks={currentTasks} 
            completeTask={completeTask} 
            showTaskDetails={showTaskDetails}
            navigation={navigation}
          />
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
    paddingBottom: Platform.OS === 'ios' ? 220 : 170,
    borderRadius: Platform.OS === 'ios' ? 0 : 25,
  },
  scroll: {
  },
})