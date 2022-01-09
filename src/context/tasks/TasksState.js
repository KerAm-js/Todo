import React, { useReducer } from "react";
import { 
  ADD_TASK, 
  COMPLETE_TASK, 
  EDIT_TASK, 
  FIND_CURRENT_TASKS, 
  FIND_EXPIRED_TASKS,   
  REMOVE_TASK, 
  SET_TASK_EXPIRED, 
  SHOW_TASK_DETAILS, 
  UPDATE_RESULT, 
  UPDATE_STATS, 
  UPLOAD_STATS, 
  UPLOAD_TASKS,
} from "./types";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./TasksReducer";
import { deleteAllNotifications, setNotification } from "../../native/notifications"; 
import { DB } from "../../backend/db";


const TasksState = ({children}) => {
  const initialState = {
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
    },
    notifications: [],
  }

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const findExpiredTasks = async () => {
    try {
      state.tasks.forEach(async task => {
        if (task.finishTime) {
          const finish = new Date(task.finishTime);
          const currentDate = new Date();
          if (finish < currentDate && !task.isExpired) {
            await DB.setTaskExpired(task.id);
            dispatch({ type: SET_TASK_EXPIRED, id: task.id, callBack: () => {}, });
          }
        }
      })
      dispatch({type: FIND_EXPIRED_TASKS});
    } catch (e) {
      console.log(e);
    }
  };

  const findCurrentTasks = () => dispatch({type: FIND_CURRENT_TASKS});

  const getResult = (tasks) => {
    const completedTasks = tasks.reduce((prev, task) => task.isCompleted ? prev + 1 : prev, 0);
    const expiredTasks = tasks.reduce((prev, task) => task.isExpired ? prev + 1 : prev, 0);
    const progress = Math.round((completedTasks / state.tasks.length) * 100) || 0;
    const tasksLeft = tasks.length - completedTasks;
    const completedInTime = tasks.reduce((prev, task) => task.isCompleted && task.isCompletedInTime ? prev + 1 : prev, 0);
    
    return {
      progress,
      completedTasks,
      expiredTasks,
      tasksLeft,
      completedInTime,
    };
  }

  const getStats = (stats, tasks, result) => {
    const tasksCount = Number(stats.tasksCount) + tasks.length;
    const completedInTimeCount = Number(stats.completedInTimeCount) + result.completedInTime;
    const completedTasksCount = Number(stats.completedTasksCount) + result.completedTasks;
    const workingDaysCount = Number(stats.workingDaysCount);
    const currentDate = stats.currentDate

    const completedTasksPart = tasksCount ? Math.round((completedTasksCount / tasksCount) * 100) : 0;
    const dailyTaskCreatingAverage = workingDaysCount ? Math.round((tasksCount / workingDaysCount)) : 0;
    const completedInTime = completedTasksCount ? Math.round((completedInTimeCount/completedTasksCount) * 100 ) : 0;

    return {
      ...stats,
      tasksCount,
      completedInTimeCount,
      completedTasksCount,
      workingDaysCount,
      completedTasksPart,
      dailyTaskCreatingAverage,
      completedInTime,
      currentDate,
    };
  }

  const updateResult = () => {
    dispatch({type: UPDATE_RESULT, getResult});
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
    try {
      const stats = await getStatsFromLocalDB();
      const getStatsForReducer = (tasks, result) => getStats(stats, tasks, result)
      dispatch({type: UPDATE_STATS, getStatsForReducer});
    } catch (e) {
      console.log(e)
    }
  }

  const getTasksFromLocalDB = async () => {
    try {
      const result = await DB.getTasks();
      const tasks = await result;
      return tasks
    } catch (e) {
      console.log(e)
    }
  }

  const updateTasks = async () => {
    try {
      dispatch({type: UPLOAD_TASKS, taskList: []});
      const tasks = await getTasksFromLocalDB();
      tasks.forEach(task => dispatch({type: ADD_TASK, task}));
    } catch (e) {
      console.log(e)
    }
  }

  const uploadTasks = async tasks => {
    try {
      if (!tasks) {
        await DB.deleteAllTasks();
        dispatch({type: UPLOAD_TASKS, taskList: []});
      } else {
        if (tasks?.length > 0) {
          const taskList = tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description || null,
            startTime: task.startTime || null,
            finishTime: task.finishTime || null,
            isCompleted: task.isCompleted,
            isCompletedInTime: task.isCompletedInTime,
            isExpired: task.isExpired,
          }))
          await DB.deleteAllTasks();
          dispatch({type: UPLOAD_TASKS, taskList: []});
          taskList.forEach(async task => {
            const result = await DB.addTask(task);
            const id = await result;
            dispatch({type: ADD_TASK, task: {...task, id}});
          });
        }
      }
      
    } catch (e) {
      console.log(e)
    }
  };

  const uploadStats = async stats => {
    try {
      await DB.updateStats(stats);
      dispatch({type: UPLOAD_STATS, stats});
    } catch (e) {
      console.log(e);
    }
  }

  const deleteAllTasks = async () => {
    try {
      await DB.deleteAllTasks();
      dispatch({type: UPLOAD_TASKS, taskList: []});
    } catch (e) {
      console.log(e);
    }
  }

  const onNewDayHandler = async () => {
    const stats = await getStatsFromLocalDB();
    const currentDate = new Date().toLocaleDateString();
    if (stats.currentDate === currentDate) {
      await updateTasks();
    } else {
      const tasks = await getTasksFromLocalDB();
      const result = getResult(tasks);

      const currentStats = getStats(stats, tasks, result);
      const statsForUpdating = {
        ...currentStats,
        currentDate,
        workingDaysCount: currentStats.workingDaysCount + 1,
      }
      const expiredTasks = tasks.filter(task => !task.isCompleted)
      const tasksForUpdating = expiredTasks.map(task => ({
        ...task,
        startTime: null,
        finishTime: null,
        isExpired: 0,
      }));

      await DB.updateStats(statsForUpdating);
      await DB.deleteAllTasks();

      if (tasksForUpdating.length > 0) {
        tasksForUpdating.forEach(async task => {
          const result = await DB.addTask(task);
          const id = await result;
          dispatch({type: ADD_TASK, task: {...task, id}});
        });
      };
    }
  }

  const showTaskDetails = (id, navigation) => {
    dispatch({type: SHOW_TASK_DETAILS, id});
    navigation.navigate("TaskViewing");
  }; 

  const completeTask = async id => {
    try {
      let isTaskCompleted;
      let isTaskCompletedInTime;
      const tasksCopy = state.tasks.map(task => {
        if (task.id === id) {
          const isCompleted = task.isCompleted;
          const isExpired = task.isExpired;
          task.isCompleted = Number(!isCompleted);
          task.isCompletedInTime = Number(!isCompleted) && Number(!isExpired);
          //for DB
          isTaskCompleted = Number(!isCompleted);
          isTaskCompletedInTime =  Number(!isCompleted) && Number(!isExpired);
          
          return task;
        }
        return task;
      });
      await DB.completeTask(id, Number(isTaskCompleted), Number(isTaskCompletedInTime));
      dispatch({type: COMPLETE_TASK, tasks: tasksCopy});
    } catch (e) {
      console.log(e)
    }
  };

  const setTaskExpired = async (id, start, end, callBack = () => {}) => {
    const startTime = new Date(start);
    const finishTime = new Date(end);
    if (startTime && finishTime && new Date() < finishTime) {
      setTimeout(() => {
        dispatch({type: SET_TASK_EXPIRED, id, callBack});
      }, finishTime - new Date());
    }
  };

  const setStartedTaskNotification = async (task, id) => {
    if (task.startTime && !task.isExpired && !task.isCompleted) {
      const start = new Date(task.startTime);
      const currentDate = new Date();
      const notificationTime = Math.round((start - currentDate) / 1000);
      const notificationId = await setNotification(
        "Пора приступать к задаче", 
        `"${task.title}"`, 
        notificationTime
      );
    }
  }

  const setExpiredTaskNotification = async (task, id) => {
    if (task.finishTime && !task.isExpired && !task.isCompleted) {
      const finish = new Date(task.finishTime);
      const currentDate = new Date();
      const notificationTime = (finish - currentDate) / 1000;
      const notificationId = await setNotification(
        "Задача просрочена", 
        `"${task.title}"`, 
        notificationTime
      );
    }
  }

  const updateNotifications = async () => {
    await deleteAllNotifications();
    state.tasks.forEach(async task => {
      if (task.startTime && !task.isExpired && !task.isCompleted) {
        await setStartedTaskNotification(task);
      }
      if (task.finishTime && !task.isExpired && !task.isCompleted) {
        await setExpiredTaskNotification(task);
      }
    })
  }

  const addTask = async task => {
    try {
      const result = await DB.addTask(task);
      const id = await result;
      dispatch({type: ADD_TASK, task: {...task, id}});
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
      onNewDayHandler,
      deleteAllTasks,
      updateResult,
      uploadTasks,
      uploadStats,
      updateTasks,
      updateStats,
      updateNotifications,
    }}>
      {children}
    </TasksContext.Provider>
  )
};

export default TasksState;
