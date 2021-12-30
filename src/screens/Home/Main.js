import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, StatusBar, Platform } from "react-native";
import HomeSlider from "../../components/Home/HomeSlider";
import HomeToday from "../../components/Home/HomeToday";
import HomeCurrentTask from "../../components/Home/HomeCurrentTask";
import HomeResults from "../../components/Home/HomeResult";
import HomeGreeting from "../../components/Home/HomeGreeting";
import HomeTasksCount from "../../components/Home/HomeTasksCount";
import TabScreenHeader from "../../components/headers/TabScreenHeader";
import HomeExpiredTasks from "../../components/Home/HomeExpiredTasks";
import { TasksContext } from "../../context/tasks/TasksContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Main = ({slides, navigation}) => {

  const logic = useContext(TasksContext);
  const deviceTopSpace = useSafeAreaInsets().top || 20;

  useEffect(() => {
    logic.onNewDayHandler(new Date());
  });

  useEffect(() => {
    logic.findExpiredTasks();
    logic.findCurrentTasks();
    logic.updateResult();
  }, [logic.state.tasks])

  return (
    <View style={{...styles.container}}>
      <StatusBar 
        barStyle="light-content"
      />
      <TabScreenHeader 
        title="Productive+" 
        paddingTop={deviceTopSpace}
      />
      <HomeGreeting 
        paddingTop={deviceTopSpace + 25 + 10}
      />
      <ScrollView 
        style={{...styles.scroll, paddingTop: Platform.OS === 'ios' ? deviceTopSpace + 35 + 50 + 60 : deviceTopSpace + 35 + 50 + 30}}
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
          {
            logic.state.expiredTasks?.length > 0
              ? <HomeExpiredTasks 
                  expiredTasks={logic.state.expiredTasks} 
                  completeTask={logic.completeTask} 
                  showTaskDetails={logic.showTaskDetails}
                  navigation={navigation}
                />
              : null
          }
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