import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import TaskViewing from "../TaskViewing";
import Main from "./Main";
import Targets from "./Targets";
import Notes from "./Notes";


const Stack = createStackNavigator();

const TasksScreen = ({tasks, setTasks, viewedTask, setViewedTask, addTask, removeTask, completeTask, showTaskDetails }) => {
  
  return (
    <Stack.Navigator 
      initialRouteName="Main"
    >
      <Stack.Group
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="Main"
        >
          {
            props => (
              <Main 
                {...props} 
                tasks={tasks} 
                setTasks={setTasks}
                viewedTask={viewedTask} 
                setViewedTask={setViewedTask} 
                addTask={addTask}
                completeTask={completeTask}
                showTaskDetails={showTaskDetails}
              />
            )
          }
        </Stack.Screen>
        <Stack.Screen 
          name="Targets"
        >
          {
            props => (
              <Targets {...props} />
            )
          }
        </Stack.Screen>
        <Stack.Screen 
          name="Notes"
        >
          {
            props => (
              <Notes {...props} />
            )
          }
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default TasksScreen;