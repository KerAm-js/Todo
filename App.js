import React from "react";
import TasksState from "./src/context/tasks/TasksState";
import RootNavigator from "./src/navigators/RootNavigator";

export default function App() {

  return (
    <TasksState>
      <RootNavigator />
    </TasksState>
  )
}