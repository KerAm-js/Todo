import React from 'react';
import { StyleSheet, } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from '../components/TabBar';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {

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
