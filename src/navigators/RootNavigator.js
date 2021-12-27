import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskViewing from '../screens/TaskViewing';
import TabNavigator from './TabNavigator';
import TargetViewing from '../screens/TargetViewing';

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
            name="TaskViewing"
          >
            {
              props => <TaskViewing 
                {...props} 
              />
            }
          </Stack.Screen>
          <Stack.Screen
            name="TargetViewing"
          >
            {
              props => <TargetViewing 
                {...props} 
              />
            }
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
