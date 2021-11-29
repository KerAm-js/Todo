import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddTaskButton from "../components/AddTaskButton";
import TaskBlock from "../components/TaskBLock";
import TaskModal from "../components/TaskModal";
import GradientLayout from "../layouts/GradientLayout";

const tasks = [
  {
    text: 'task text',
    description: 'Description Description Description Description Description Description Description DescriptionDescription',
    time: '0:29',
    isCompleted: false,
    meaning: 'danger',
  },
  {
    text: 'task text',
    description: 'Description',
    time: '20:29',
    isCompleted: false,
  },
  {
    text: 'task text',
    description: 'Description',
    time: '1 дн',
    isCompleted: false,
  }
]

const TasksScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <GradientLayout style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <AddTaskButton showModal={() => setModalVisible(true)}/>
        <TaskModal 
          visible={modalVisible} 
          closeModal={() => setModalVisible(false)}
        />
        {
          tasks.map((task, index) => (
            <TaskBlock 
              {...task} 
              key={index}
            />
          ))
        }
      </ScrollView>
    </GradientLayout>
  )
}

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
  },
  scrollContainer: {
    paddingHorizontal: 30,
  }
})