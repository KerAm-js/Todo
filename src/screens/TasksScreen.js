import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import AddTaskButton from "../components/AddTaskButton";
import TaskBlock from "../components/TaskBLock";
import ModalLayout from "../layouts/ModalLayout";
import GradientLayout from "../layouts/GradientLayout";
import TaskForm from "../components/TaskForm";

const TasksScreen = () => {

  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addTask = (text, time, description) => {
    if (text.trim() && time.trim()) {
      setTasks([
        {
          id: tasks.length,
          text,
          time,
          description,
          isCompleted: false,
        },
        ...tasks
      ])
      return true
    } else {
      Alert.alert('Пожалуйста заполните все поля кроме описания')
      return false
    }
  }; 

  const deleteTask = id => {
    setTasks(previous => previous.filter(task => task !== previous[id]))
  }

  const toggleTaskCompleting = (id, isCompleted) => {
    const tasksCopy = [...tasks];
    tasksCopy[id].isCompleted = !isCompleted;
    setTasks(tasksCopy);
  }

  return (
    <GradientLayout style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <AddTaskButton showModal={() => setModalVisible(true)}/>
        <ModalLayout 
          visible={modalVisible} 
          closeModal={() => setModalVisible(false)}
        >
          <TaskForm 
            type="add"
            closeModal={() => setModalVisible(false)} 
            addTask={addTask}
          />
        </ModalLayout>
        {
          tasks.map((task, index) => (
            <TaskBlock 
              {...task} 
              key={index}
              deleteTask={() => deleteTask(task.id)}
              toggleTaskCompleting={() => toggleTaskCompleting(task.id, task.isCompleted)}
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