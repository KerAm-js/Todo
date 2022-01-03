import React, {useEffect, useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskViewing from '../screens/TaskViewing';
import TabNavigator from './TabNavigator';
import TargetViewing from '../screens/TargetViewing';
import { ProfileContext } from '../context/profile/ProfileContext';
import { TasksContext } from '../context/tasks/TasksContext';

const Stack = createStackNavigator();

export default function RootNavigator() {

  const profileCntxt = useContext(ProfileContext);

  useEffect(profileCntxt.autoLogin, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
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
