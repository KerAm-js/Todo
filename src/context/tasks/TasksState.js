import React, { useReducer } from "react";
import { 
  ADD_TASK, 
  COMPLETE_TASK, 
  EDIT_TASK, 
  FIND_CURRENT_TASKS, 
  FIND_EXPIRED_TASKS, 
  ON_NEW_DAY_HANDLER, 
  REMOVE_TASK, 
  SET_TASK_TIMEOUT, 
  SHOW_TASK_DETAILS, 
  UPDATE_RESULT 
} from "./constants";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./TasksReducer";

const TasksState = ({children}) => {
  const initialState = {
    currentDate: new Date(),
    createdTasksCount: 1,
    tasks: [
      {
        id: `0_${new Date()}`,
        title: "Задача 1",
        description: null,
        startTime: null,
        finishTime: null,
        isCompleted: false,
        isExpired: false, 
        isDayExpired: false,
      }
    ],
    expiredTasks: [],
    currentTasks: [],
    viewedTask: null,
    stats: {
      tasksCount: null,
      completedTasksCount: null,
      completedTasksPart: null,
      completedInTime: null,
      dailyTaskCreatingAverage: null,
      workingDaysCount: null,
    },
    result: {
      progress: null,
      completedTasks: null,
      expiredTasks: null,
      tasksLeft: null,
      completedInTime: null,
    }
  }

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const findExpiredTasks = () => dispatch({type: FIND_EXPIRED_TASKS});
  const findCurrentTasks = () => dispatch({type: FIND_CURRENT_TASKS});
  const updateResult = () => dispatch({type: UPDATE_RESULT});

  const onNewDayHandler = date => dispatch({ type: ON_NEW_DAY_HANDLER, date, })
  

  const showTaskDetails = (id, navigation) => {
    dispatch({type: SHOW_TASK_DETAILS, id});
    navigation.navigate("Viewing");
  }; 

  const completeTask = id => {
    dispatch({type: COMPLETE_TASK, id});
  };
  
  const setTaskTimout = (id, start, end) => {
    dispatch({type: SET_TASK_TIMEOUT, id, start, end});
  };

  const addTask = task => {
    dispatch({type: ADD_TASK, task});
    setTaskTimout(task.id, task.startTime, task.finishTime);
  };

  const removeTask = id => {
    if (id) {
      dispatch({type: REMOVE_TASK, id});
    }
  };

  const editTask = (id, taskData) => {
    dispatch({type: EDIT_TASK, id, taskData});
  };

  return (
    <TasksContext.Provider value={{
      state,
      addTask,
      removeTask,
      editTask,
      completeTask,
      findExpiredTasks,
      findCurrentTasks,
      setTaskTimout,
      showTaskDetails,
      updateResult,
      onNewDayHandler,
    }}>
      {children}
    </TasksContext.Provider>
  )
};

export default TasksState;
