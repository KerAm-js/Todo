import React from "react";
import NotesState from "./src/context/notes/NotesState";
import TargetsState from "./src/context/targets/TargetsState";
import TasksState from "./src/context/tasks/TasksState";
import RootNavigator from "./src/navigators/RootNavigator";

export default function App() {

  return (
    <TargetsState>
      <TasksState>
        <NotesState>
          <RootNavigator />
        </NotesState>
      </TasksState>
    </TargetsState>   
  )
}