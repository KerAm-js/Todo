import React, { useState } from "react";
import NotesState from "./src/context/notes/NotesState";
import TargetsState from "./src/context/targets/TargetsState";
import TasksState from "./src/context/tasks/TasksState";
import RootNavigator from "./src/navigators/RootNavigator";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ProfileContext } from "./src/context/profile/ProfileContext";
import ProfileState from "./src/context/profile/ProfileState";

async function loadApplication() {
  await Font.loadAsync({
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-semiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  })
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <AppLoading 
        startAsync={() => loadApplication()} 
        onError={err => console.log(err)}
        onFinish={() => setIsLoaded(true)}
      />
    )
    
  }

  return (
    <ProfileState>
      <TargetsState>
        <TasksState>
          <NotesState>
            <RootNavigator />
          </NotesState>
        </TasksState>
      </TargetsState> 
    </ProfileState>
  )
}