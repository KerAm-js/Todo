import React from 'react';
import { StyleSheet, } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from '../components/TabBar';


const Tab = createBottomTabNavigator();

export default function TabNavigator({
  currentTasks,
  tasks,
  setTasks,
  viewedTask,
  setViewedTask,
  addTask,
  removeTask,
  completeTask,
  expiredTasks,
  showTaskDetails,
}) {
  
  return (
    <Tab.Navigator 
      initialRouteName="Home" 
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen 
        name="Home"  
        options={{
          title: "",
          headerShown: false
        }}
      >
        {
          props => <HomeScreen 
            {...props} 
            tasks={tasks} 
            currentTasks={currentTasks}
            completeTask={completeTask}
            showTaskDetails={showTaskDetails}
            expiredTasks={expiredTasks}
          />
        }
      </Tab.Screen>
      <Tab.Screen 
        name="Tasks" 
        options={{
          title: "",
          headerShown: false,
          tabBarLabel: "Tasks",
        }}
      >
        {
          props => <TasksScreen 
            {...props} 
            tasks={tasks} 
            setTasks={setTasks}
            viewedTask={viewedTask}
            setViewedTask={setViewedTask}
            addTask={addTask}
            removeTask={removeTask}
            completeTask={completeTask}
            showTaskDetails={showTaskDetails}
          />
        }
      </Tab.Screen>
      <Tab.Screen 
        name="Profile" 
        options={{
          title: "",
          headerShown: false,
          tabBarLabel: "Profile",
        }}
      >
        {
          props => <ProfileScreen 
            {...props}
          />
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
