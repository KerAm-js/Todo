import React, { useContext, useEffect } from "react";
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
import { TasksContext } from "../../context/tasks/TasksContext";


const Main = ({slides, navigation}) => {
  const scrollPaddingTop = Platform.OS === 'ios' ? useSafeAreaInsets().top + 160 : useSafeAreaInsets().top + 120;
  const logic = useContext(TasksContext);
  console.log(logic.state.createdTasksCount);
  useEffect(() => {
    logic.onNewDayHandler(new Date());
    console.log('ok')
  });

  useEffect(() => {
    logic.findExpiredTasks();
    logic.findCurrentTasks();
    logic.updateResult();
  }, [logic.state.tasks])

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
          <HomeSlider 
            navigation={navigation} 
            slides={slides}
          />
          <HomeToday />
          <HomeTasksCount 
            count={logic.state.tasks.length} 
            navigation={navigation}
          />
          <HomeExpiredTasks 
            expiredTasks={logic.state.expiredTasks} 
            completeTask={logic.completeTask} 
            showTaskDetails={logic.showTaskDetails}
            navigation={navigation}
          />
          <HomeCurrentTask 
            currentTasks={logic.state.currentTasks} 
            completeTask={logic.completeTask} 
            showTaskDetails={logic.showTaskDetails}
            navigation={navigation}
          />
          <HomeResults result={logic.state.result} />
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