import React from "react";
import TargetsState from "./src/context/targets/TargetsState";
import TasksState from "./src/context/tasks/TasksState";
import RootNavigator from "./src/navigators/RootNavigator";

export default function App() {

  return (
    <TargetsState>
      <TasksState>
        <RootNavigator />
      </TasksState>
    </TargetsState>   
  )
}