import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyButton from "../components/buttons/MyButton";
import TaskData from "../components/Tasks/TaskData";
import SlideScreenHeader from "../components/Tasks/SlideScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ModalLayout from "../layouts/ModalLayout";
import TaskForm from "../components/Tasks/TaskForm";
import { TasksContext } from "../context/tasks/TasksContext";

const TaskViewing = ({navigation}) => {

  console.log(navigation);

  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const tasksCntxt = useContext(TasksContext);
  
  const closeModal = () => setEditModalVisible(false);
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
            tasksCntxt.removeTask(tasksCntxt.state.viewedTask.id);
          },
          style: "destructive"
        },
      ]
    )
  }

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 35}}>
      {
        editModalVisible 
        ? <View style={{...styles.backdrop}}></View>
        : null
      }
      <SlideScreenHeader 
        navigation={navigation}
        title="Просмотр"
        paddingTop={deviceTopSpace}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TaskData 
          task={tasksCntxt.state.viewedTask}
          completeTask={() => tasksCntxt.completeTask(tasksCntxt.state.viewedTask.id)}
        />
        <MyButton 
          type="submit"
          title="Редактировать"
          onPress={() => setEditModalVisible(true)}
        />
        <MyButton 
          type="danger"
          title="Удалить"
          onPress={taskRemoving}
        />
        <ModalLayout
          visible={editModalVisible}
          close={closeModal}
          style={{paddingTop: deviceTopSpace + 35}}
        >
          <TaskForm 
            name="task"
            type="edit"
            task={tasksCntxt.state.viewedTask}
            close={closeModal}
            editTask={taskData => tasksCntxt.editTask(tasksCntxt.state.viewedTask.id, taskData)}
            navigation={navigation}
          />
        </ModalLayout>
      </ScrollView>
    </View>
  )
}

export default TaskViewing;

const styles = StyleSheet.create({
  container: {
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
  backdrop: {
    position: "absolute",
    zIndex: 200,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    height: '100%',
    width: '100%',
  }
});