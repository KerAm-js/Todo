import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyButton from "../components/buttons/MyButton";
import TaskData from "../components/Tasks/TaskData";
import ViewingHeading from "../components/Tasks/ScreenHeader";

const TaskViewing = ({navigation, task, completeTask, removeTask}) => {

  const taskRemoving = () => {
    Alert.alert(
      "Удаление задачи",
      "Вы уверены, что хотите удалить задачу?",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "Cancel"
        },
        {
          text: "Удалить",
          onPress: () => {
            navigation.goBack();
            removeTask();
          },
          style: "destructive"
        },
      ]
    )
  }

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
          task={task}
          completeTask={completeTask}
        />
        <MyButton 
          type="submit"
          title="Редактировать"
          onPress={() => console.log('pressed')}
        />
        <MyButton 
          type="danger"
          title="Удалить"
          onPress={taskRemoving}
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
  image: {
    width: 16,
    height: 16,
  },
  successImage: {
    width: 20,
    height: 16,
  },
});