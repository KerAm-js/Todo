import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TaskBlock from "../components/TaskBLock";
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
  return (
    <GradientLayout style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
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