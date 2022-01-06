import React, { useReducer } from "react";
import { 
  ADD_TASK, 
  COMPLETE_TASK, 
  EDIT_TASK, 
  FIND_CURRENT_TASKS, 
  FIND_EXPIRED_TASKS,   
  GET_TASKS_FROM_LOCAL_DB,  
  ON_NEW_DAY_HANDLER, 
  REMOVE_TASK, 
  SET_TASK_EXPIRED, 
  SHOW_TASK_DETAILS, 
  TO_START_TASK, 
  UPDATE_RESULT, 
  UPDATE_STATS, 
  UPLOAD_TASKS,
} from "./types";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./TasksReducer";
import { presentNotification } from "../../native/notifications"; 
import { DB } from "../../backend/db";


const TasksState = ({children}) => {
  const initialState = {
    currentDate: new Date().toString(),
    tasks: [],
    expiredTasks: [],
    currentTasks: [],
    viewedTask: null,
    stats: {
      currentDate: new Date().toLocaleDateString(),
      completedTasksCount: 0,
      completedTasksPart: 0,
      completedInTime: 0,
      dailyTaskCreatingAverage: 0,
    },
    result: {
      progress: 0,
      completedTasks: 0,
      expiredTasks: 0,
      tasksLeft: 0,
      completedInTime: 0,
    }
  }

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const findExpiredTasks = () => dispatch({type: FIND_EXPIRED_TASKS});
  const findCurrentTasks = () => dispatch({type: FIND_CURRENT_TASKS});

  const updateResult = () => {
    dispatch({type: UPDATE_RESULT});
  }

  const getStatsFromLocalDB = async () => {
    try {
      const statsFromDB = await DB.getStats();
      return statsFromDB[0];
    } catch (e) {
      console.log(e)
    }
  }

  const updateStats = async () => {
    const stats = await getStatsFromLocalDB();
    dispatch({type: UPDATE_STATS, stats});
  }

  const getTasksFromLocalDB = async () => {
    const result = await DB.getTasks();
    const tasks = await result;
    dispatch({type: GET_TASKS_FROM_LOCAL_DB, tasks});
  }

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

  const addTask = async task => {
    try {
      const result = await DB.addTask(task);
      const id = await result;
      dispatch({type: ADD_TASK, task: {...task, id}});
      setStartedTaskNotification(task);
      setTaskExpired(task.id, task.startTime, task.finishTime, () => {
        presentNotification(
          "Задача просрочена",
          `"${task.title}"`,
        );
      });
    } catch (e) {
      console.log(e)
    }
    
  };

  const removeTask = async id => {
    try {
      await DB.deleteTask(id);
      dispatch({type: REMOVE_TASK, id});
    } catch (e) {
      console.log(e);
    }
  };

  const editTask = async (id, taskData) => {
    try {
      await DB.editTask(id, taskData);
      dispatch({type: EDIT_TASK, id, taskData});
      setTaskExpired(id, taskData.startTime, taskData.finishTime);
    } catch (e) {
      console.log(e);
    }
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
      getTasksFromLocalDB,
      updateStats,
    }}>
      {children}
    </TasksContext.Provider>
  )
};

export default TasksState;
