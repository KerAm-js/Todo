import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Main";
import Notes from "./Notes";


const Stack = createStackNavigator();

const TasksScreen = () => {
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
              />
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