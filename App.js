import React, { useContext, useState } from "react";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import NotesState from "./src/context/notes/NotesState";
import TargetsState from "./src/context/targets/TargetsState";
import TasksState from "./src/context/tasks/TasksState";
import ProfileState from "./src/context/profile/ProfileState";
import RootNavigator from "./src/navigators/RootNavigator";
import { DB } from "./src/backend/db";


async function loadApplication() {
  try {
    await Font.loadAsync({
      'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
      'nunito-semiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
      'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    })

    await DB.initTasks();
    await DB.initTargets();
    await DB.initStats();
    await DB.initNotes();

    let stats = await DB.getStats();
    if (stats.length === 0) {
      let id = await DB.addStatsRow();
    }

    console.log('Data base started');
  } catch (e) {
    console.log(e);
  }
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <AppLoading 
        autoHideSplash={true}
        startAsync={async () => await loadApplication()} 
        onError={err => console.log(err)}
        onFinish={() => {
          setIsLoaded(true);
          SplashScreen.hideAsync();
        }}
      />
    )
  }

  return (
    <ProfileState>
      <TargetsState>
        <TasksState>
          <NotesState>
            <RootNavigator/>
          </NotesState>
        </TasksState>
      </TargetsState> 
    </ProfileState>
  )
}