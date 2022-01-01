import React, { useEffect, useReducer } from "react";
import { 
  ADD_TASK, 
  COMPLETE_TASK, 
  EDIT_TASK, 
  FIND_CURRENT_TASKS, 
  FIND_EXPIRED_TASKS, 
  INIT_TASKS, 
  ON_NEW_DAY_HANDLER, 
  REMOVE_TASK, 
  SET_TASK_EXPIRED, 
  SHOW_TASK_DETAILS, 
  UPDATE_RESULT 
} from "./types";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./TasksReducer";


const TasksState = ({children}) => {
  const initialState = {
    currentDate: new Date().toString(),
    createdTasksCount: 1,
    tasks: [],
    expiredTasks: [],
    currentTasks: [],
    viewedTask: null,
    stats: {
      tasksCount: 0,
      completedTasksCount: 0,
      completedTasksPart: 0,
      completedInTime: 0,
      dailyTaskCreatingAverage: 0,
      workingDaysCount: 0,
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

  const initialize = async () => {
    const currentData = await getData('tasksSate');
    if (currentData) {
      dispatch({type: INIT_TASKS, state: currentData});
    }
  }

  // useEffect(() => {
  //   initialize();
  // }, []);

  // useEffect(async () => {
  //   await setData('tasksState', state);
  // })

  const onNewDayHandler = date => {
    dispatch({ type: ON_NEW_DAY_HANDLER, date, })
  }
  
  const showTaskDetails = (id, navigation) => {
    dispatch({type: SHOW_TASK_DETAILS, id});
    navigation.navigate("TaskViewing");
  }; 

  const completeTask = id => {
    dispatch({type: COMPLETE_TASK, id});
  };
  
  const setTaskExpired = (id, start, end) => {
    if (start && end && new Date() < end) {
      setTimeout(() => {
        dispatch({type: SET_TASK_EXPIRED, id});;
      }, end - new Date());
    }
  };

  const addTask = task => {
    dispatch({type: ADD_TASK, task});
    setTaskExpired(task.id, task.startTime, task.finishTime);
  };

  const removeTask = id => {
    if (id) {
      dispatch({type: REMOVE_TASK, id});
    }
  };

  const editTask = (id, taskData) => {
    dispatch({type: EDIT_TASK, id, taskData});
    setTaskExpired(id, taskData.startTime, taskData.finishTime);
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
      showTaskDetails,
      updateResult,
      onNewDayHandler,
    }}>
      {children}
    </TasksContext.Provider>
  )
};

export default TasksState;
