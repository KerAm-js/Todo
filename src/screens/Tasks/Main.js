import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import AddTaskButton from "../../components/Tasks/AddTaskButton";
import TaskBlock from "../../components/Tasks/TaskBLock";
import ModalLayout from "../../layouts/ModalLayout";
import TaskForm from "../../components/Tasks/TaskForm";
import FooterSpace from "../../components/FooterSpace";
import TasksHeader from "../../components/Tasks/TasksHeader";
import Task from "../../components/Tasks/Task";
import NewTaskForm from "../../components/Tasks/NewTaskForm";


const Main = () => {

  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const editTask = (text, date, description) => {
    const currentTask = tasks.find(task => task.id === editTaskId);
    const tasksCopy = [...tasks];
    const task = tasksCopy.find(task => task.id === editTaskId);
    console.log(editTaskId);
    if (
      currentTask.text === text && 
      currentTask.date === date && 
      currentTask.description === description
    ) {
      null
    } else {
      task.text = text;
      task.date = date;
      task.description = description;
    } 
    setTasks(tasksCopy);
    setEditTaskId(null);
  }; 

  const addTask = (text, date, description) => {
    setTasks([
      {
        id: `${tasks.length}.${new Date().toLocaleString()}`,
        listNumber: tasks.length,
        text,
        date,
        description,
        isCompleted: false,
        isDeadline: false,
      },
      ...tasks
    ])
  }

  const deleteTask = id => {
    setTasks(previous => previous.filter(task => task.id !== id ))
  }

  const toggleTaskCompleting = (id, isCompleted) => {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find(task => task.id === id)
    task.isCompleted = !isCompleted;
    setTasks(tasksCopy);
  }

  const setIsDeadline = (id, isDeadline) => {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find(task => task.id === id)
    task.isDeadline = isDeadline;
    setTasks(tasksCopy);
  }

  return (
    <View style={styles.container}>
      <TasksHeader />
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AddTaskButton />
        <Task name={'задача'} />
        {/* <NewTaskForm type={"add"} /> */}
      </ScrollView>
    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  container: {
    paddingTop: 220,
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
})
