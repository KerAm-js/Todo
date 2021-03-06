import React, {useEffect, useState, useContext, useCallback} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskViewing from '../screens/TaskViewing';
import TabNavigator from './TabNavigator';
import TargetViewing from '../screens/TargetViewing';
import { ProfileContext } from '../context/profile/ProfileContext';
import { TasksContext } from '../context/tasks/TasksContext';
import { TargetsContext } from '../context/targets/TargetsContext';
import { NotesContext } from '../context/notes/NotesContext';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

export default function RootNavigator() {

  const profileCntxt = useContext(ProfileContext);
  const tasksCntxt = useContext(TasksContext);
  const targetsCntxt = useContext(TargetsContext);
  const notesCntxt = useContext(NotesContext);

  const dataUploading = useCallback(async () => {
    SplashScreen.preventAutoHideAsync();
    await profileCntxt.autoLogin();
    await tasksCntxt.onNewDayHandler();
    await targetsCntxt.getTargetsFromLocalDB();
    await notesCntxt.getNotesFromLocalDB();
    SplashScreen.hideAsync();
  })

  useEffect(() => {
    dataUploading();
  }, []);
  
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
