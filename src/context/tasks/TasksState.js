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
import { FIND_EXPIRED_TARGETS } from "../targets/types";


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
    }
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
      const tasks = await getTasksFromLocalDB();
      tasks.forEach(task => dispatch({type: ADD_TASK, task}));
    } catch (e) {
      console.log(e)
    }
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
      if (currentDate > taskFinish) {
        task.isExpired = true;
      }
    })
    dispatch({type: UPLOAD_TASKS, taskList, result, currentDate, stats, createdTasksCount})
  };

  const onNewDayHandler = async () => {
    const stats = await getStatsFromLocalDB();
    const currentDate = new Date().toLocaleDateString();
    console.log(stats);
    if (stats.currentDate === currentDate) {
      await updateTasks();
    } else {
      const tasks = await getTasksFromLocalDB();
      console.log(tasks);
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
      // {
      //   currentDate,
      //   workingDaysCount: 1,
      //   tasksCount: 0,
      //   completedTasksCount: 0,
      //   completedInTimeCount: 0,
      // }
      await DB.deleteAllTasks();

      if (tasksForUpdating.length > 0) {
        await DB.updateAllTasks(tasksForUpdating);
        await updateTasks();
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
      if (task.startTime) {
        setTaskExpired(id, task.startTime, task.finishTime, () => {
          presentNotification(
            "Задача просрочена",
            `"${task.title}"`,
          );
        });
      }
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
      updateTasks,
      updateStats,
    }}>
      {children}
    </TasksContext.Provider>
  )
};

export default TasksState;
