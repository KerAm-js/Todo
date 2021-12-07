import React from 'react';
import { StyleSheet, } from 'react-native';
import HomeScreen from './src/screens/Home/HomeScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import TasksScreen from './src/screens/Tasks/TasksScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './src/components/TabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
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
            title: "Задачи",
            tabBarLabel: "Tasks",
            headerTransparent: true,
            headerTitleStyle: {
              color: '#fff',
              fontSize: 30
            }
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            title: "Профиль",
            tabBarLabel: "Profile",
            headerTransparent: true,
            headerTitleStyle: {
              color: '#fff',
              fontSize: 30
            }
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
});
