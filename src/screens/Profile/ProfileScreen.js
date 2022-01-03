import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import SignIn from './SignIn';
import Main from './Main';
import SignUp from './SignUp';
import { ProfileContext } from '../../context/profile/ProfileContext';

const Stack = createStackNavigator();

const ProfileScreen = () => {
  const profileCntxt = useContext(ProfileContext);

  return (
    <Stack.Navigator initialRouteName={profileCntxt.state.token ? "Main" : "SignIn"}>
      <Stack.Group
        screenOptions={{
          title: "",
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Main"
          options={{
            gestureEnabled: false
          }}
        >
          {
            props => <Main {...props} />
          }
        </Stack.Screen>
        <Stack.Screen 
          name="SignIn"
          options={{
            gestureEnabled: false
          }}
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
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ProfileScreen;