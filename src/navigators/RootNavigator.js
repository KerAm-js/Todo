import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskViewing from '../screens/TaskViewing';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Group
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen
            name="Root"
          >
            {
              props => <TabNavigator 
                {...props}
              />
            }
          </Stack.Screen>
          <Stack.Screen
            name="Viewing"
          >
            {
              props => <TaskViewing 
                {...props} 
              />
            }
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
