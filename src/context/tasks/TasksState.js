import React, { useReducer } from "react";

import { 
  ADD_TASK, 
  COMPLETE_TASK, 
  EDIT_TASK, 
  FIND_CURRENT_TASKS, 
  FIND_EXPIRED_TASKS,  
  ON_NEW_DAY_HANDLER, 
  REMOVE_TASK, 
  SET_TASK_EXPIRED, 
  SHOW_TASK_DETAILS, 
  TO_START_TASK, 
  UPDATE_RESULT, 
  UPLOAD_TASKS
} from "./types";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./TasksReducer";
import { presentNotification, setNotification } from "../../native/notifications"; 

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

  const uploadTasks = ({
    taskList, 
    result, 
    currentDate, 
    stats, 
    createdTasksCount,
  }) => {
    taskList.forEach(task => {
      const currentDate = new Date();
      const taskFinish = new Date(task.finishTime);
      if (currentDate.toLocaleDateString() !== taskFinish.toLocaleDateString()) {
        task.isDayExpired = true;
      }
      if (currentDate > taskFinish) {
        task.isExpired = true;
      }
    })
    dispatch({type: UPLOAD_TASKS, taskList, result, currentDate, stats, createdTasksCount})
  };

  const onNewDayHandler = date => {
    dispatch({ type: ON_NEW_DAY_HANDLER, date, });
  }
  
  const showTaskDetails = (id, navigation) => {
    dispatch({type: SHOW_TASK_DETAILS, id});
    navigation.navigate("TaskViewing");
  }; 

  const completeTask = id => {
    dispatch({type: COMPLETE_TASK, id});
  };
  
  const setTaskExpired = (id, start, end, callBack = () => {}) => {
    const startTime = new Date(start);
    const finishTime = new Date(end);
    if (startTime && finishTime && new Date() < finishTime) {
      setTimeout(() => {
        dispatch({type: SET_TASK_EXPIRED, id, callBack});
      }, finishTime - new Date());
    }
  };

  const setStartedTaskNotification = task => {
    const start = new Date(task.startTime);
    const currentDate = new Date();
    const notificationTime = start - currentDate;
    setTimeout(() => {
      dispatch({type: TO_START_TASK, id: task.id, callBack: () => {
        presentNotification(
          "Пора приступать к задаче", 
          `"${task.title}"`, 
        );
      }})
    }, notificationTime)
  }

  const addTask = task => {
    setStartedTaskNotification(task);
    dispatch({type: ADD_TASK, task, });
    setTaskExpired(task.id, task.startTime, task.finishTime, () => {
      presentNotification(
        "Задача просрочена",
        `"${task.title}"`,
      );
    });
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
      uploadTasks,
    }}>
      {children}
    </TasksContext.Provider>
  )
};

export default TasksState;
