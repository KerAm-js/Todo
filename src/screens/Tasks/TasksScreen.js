import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import TaskViewing from "./TaskViewing";
import Main from "./Main";



const Stack = createStackNavigator();

const TasksScreen = () => {

  const [task, setTask] = useState(null);

  return (
    <Stack.Navigator 
      initialRouteName="Viewing"
    >
      <Stack.Screen 
        name="Viewing"
        options={{
          title: "",
          headerTransparent: true,
          headerTitleStyle: {
            fontSize: 25,
            color: '#fff',
          }
        }}
      >
        {
          props => <TaskViewing {...props} task={task} />
        }
      </Stack.Screen>
      <Stack.Screen 
        name="Main"
        options={{
          title: "Задачи",
          headerTransparent: true,
          headerTitleStyle: {
            fontSize: 25,
            color: '#fff',
          }
        }}
      >
        {
          props => <Main {...props} taskId={task} setTaskId={setTask} />
        }
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default TasksScreen;

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
