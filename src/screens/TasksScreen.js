import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import AddTaskButton from "../components/AddTaskButton";
import TaskBlock from "../components/TaskBLock";
import ModalLayout from "../layouts/ModalLayout";
import GradientLayout from "../layouts/GradientLayout";
import TaskForm from "../components/TaskForm";


const TasksScreen = () => {

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

  console.log(editTaskId);

  return (
    <GradientLayout style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <AddTaskButton showModal={() => setAddModalVisible(true)}/>
        <ModalLayout 
          visible={addModalVisible} 
          closeModal={() => setAddModalVisible(false)}
        >
          <TaskForm 
            type="add"
            closeModal={() => setAddModalVisible(false)} 
            addTask={addTask}
          />
        </ModalLayout>
        {
          tasks.length !== 0 && editTaskId
            ? <ModalLayout 
                visible={editModalVisible} 
                closeModal={() => setEditModalVisible(false)}
              >
                <TaskForm 
                  type="edit"
                  closeModal={() => setEditModalVisible(false)} 
                  editTask={editTask}
                  task={tasks.find(task => task.id === editTaskId)}
                />
              </ModalLayout>
            : null
        }
        {
          tasks.map((task, index) => (
            <TaskBlock 
              {...task} 
              key={index}
              showEditModal={() => setEditModalVisible(true)}
              deleteTask={() => deleteTask(task.id)}
              toggleTaskCompleting={
                () => toggleTaskCompleting(task.id, task.isCompleted)
              }
              setIsDeadline={
                isDeadline => setIsDeadline(task.id, isDeadline)
              }
              setEditTaskId={setEditTaskId}
            />
          ))
        }
        <View style={styles.footerSpace}>
        </View>
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
  },
  footerSpace: {
    height: 120,
  }
})
