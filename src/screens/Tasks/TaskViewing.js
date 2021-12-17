import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import MyButton from "../../components/buttons/MyButton";
import TaskData from "../../components/Tasks/TaskData";
import ViewingHeading from "../../components/Tasks/ViewingHeading";

const TaskViewing = ({navigation, task}) => {
  return (
    <View style={styles.container}>
      <ViewingHeading 
        navigation={navigation}
        title="Просмотр"
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TaskData 
          task={{
            title: "Task",
            description: "Description",
            startTime: "18:00",
            finishTime: "19:00",
            isCompleted: false,
            isLate: true,
          }}
        />
        <MyButton 
          type="submit"
          title="Редактировать"
          onPress={() => console.log('pressed')}
        />
        <MyButton 
          type="danger"
          title="Удалить"
          onPress={() => console.log('pressed')}
        />
      </ScrollView>
    </View>
  )
}

export default TaskViewing;

const styles = StyleSheet.create({
  container: {
    paddingTop: 110,
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 90,
  },
});