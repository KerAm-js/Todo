import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './src/components/headers/Header';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksScreen from './src/screens/TasksScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './src/components/TabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home" 
        tabBar={props => <TabBar {...props} />}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: "",
            headerShown: false
          }}
        />
        <Tab.Screen 
          name="Tasks" 
          component={TasksScreen} 
          options={{
            title: "",
            tabBarLabel: "Tasks",
            headerTransparent: true,
            headerBackground: () => (
              <Header />
            )
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            title: "",
            tabBarLabel: "Profile",
            headerTransparent: true,
            headerBackground: () => (
              <Header />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 40,
  },
  content: {
    flex: 1,
  }
});
