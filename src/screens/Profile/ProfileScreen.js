import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import SignIn from './SignIn';
import Main from './Main';
import SignUp from './SignUp';
import { ProfileContext } from '../../context/profile/ProfileContext';

const Stack = createStackNavigator();

const ProfileScreen = () => {
  
  return (
    <Stack.Navigator initialRouteName={"SignIn"}>
      <Stack.Group
        screenOptions={{
          title: "",
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="SignIn"
        >
          {
            props => <SignIn {...props} />
          }
        </Stack.Screen>
        <Stack.Screen 
          name="SignUp"
        >
          {
            props => <SignUp {...props} />
          }
        </Stack.Screen>
        {

        }
        <Stack.Screen 
          name="Main"
        >
          {
            props => <Main {...props} />
          }
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ProfileScreen;