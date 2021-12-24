import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyButton from "../components/buttons/MyButton";
import TaskData from "../components/Tasks/TaskData";
import ViewingHeading from "../components/Tasks/ScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ModalLayout from "../layouts/ModalLayout";
import TaskForm from "../components/Tasks/TaskForm";

const TaskViewing = ({navigation, task, completeTask, removeTask, editTask}) => {

  const containerPaddingTop = useSafeAreaInsets().top + 45;
  const [editModalVisible, setEditModalVisible] = useState(false);
  
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
            removeTask();
          },
          style: "destructive"
        },
      ]
    )
  }

  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      {
        editModalVisible 
        ? <View style={{...styles.backdrop}}></View>
        : null
      }
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
          style={{paddingTop: containerPaddingTop}}
        >
          <TaskForm 
            type="edit"
            task={task}
            close={closeModal}
            editTask={editTask}
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