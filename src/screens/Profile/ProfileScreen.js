import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import GradientLayout from '../../layouts/GradientLayout';
import Login from './Login';
import Main from './Main';
import Signin from './Signin';

const Stack = createStackNavigator();

const ProfileScreen = () => {

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Group
        screenOptions={{
          title: "",
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Main"
        >
          {
            props => <Main {...props} />
          }
        </Stack.Screen>
        <Stack.Screen 
          name="Login"
        >
          {
            props => <Login {...props} />
          }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin"
        >
          {
            props => <Signin {...props} />
          }
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ProfileScreen;