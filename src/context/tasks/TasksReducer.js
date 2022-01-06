import { 
  INIT_TASKS,
  ADD_TASK,
  EDIT_TASK,
  REMOVE_TASK,
  COMPLETE_TASK,
  FIND_EXPIRED_TASKS,
  FIND_CURRENT_TASKS,
  SHOW_TASK_DETAILS,
  SET_TASK_EXPIRED, 
  UPDATE_RESULT,
  ON_NEW_DAY_HANDLER,
  UPLOAD_TASKS,
  TO_START_TASK,
  GET_TASKS_FROM_LOCAL_DB,
  UPDATE_STATS,
} from "./types";

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case GET_TASKS_FROM_LOCAL_DB: {
      return {
        ...state,
        tasks: action.tasks,
      }
    };
    case UPLOAD_TASKS: {
      return {
        currentDate: action.currentDate,
        createdTasksCount: action.createdTasksCount,
        tasks: [...action.taskList],
        expiredTasks: [],
        currentTasks: [],
        viewedTask: null,
        stats: {...action.stats},
        result: {...action.result},
      }
    };
    case INIT_TASKS : {
      return {
        ...action.state
      }
    };
    case TO_START_TASK: {
      if (state.tasks.find(task => task.id === action.id)) {
        action.callBack();
      };
      return state;
    }
    case ADD_TASK: {
      let tasksCopy = [...state.tasks];
      const newTask = action.task;

      if (newTask.startTime && state.tasks.length > 0) {
        let indexOfNewTask;
        let firstPartOfArray;
        let secondPartOfArray;

        const newTaskStart = newTask.startTime;
        const newTaskFinish = newTask.finishTime;

        let firstIndex = tasksCopy.findIndex(task => {
          return task.startTime?.slice(16,21) === newTaskStart.slice(16,21);
        })

        if (firstIndex !== -1) {

          const tasksWithSameStart = tasksCopy.filter(task => {
            return task.startTime?.slice(16,21) === newTaskStart.slice(16,21);
          });

          indexOfNewTask = tasksWithSameStart.findIndex(task => {
            return task.finishTime?.slice(16,21) >= newTaskFinish.slice(16,21)
          });

          if (indexOfNewTask === -1) {
            indexOfNewTask = tasksWithSameStart.length;
          }

          indexOfNewTask += firstIndex;
        } else {
          indexOfNewTask = tasksCopy.findIndex(task => {
            return task.startTime?.slice(16,21) > newTaskStart.slice(16,21);
          });
          if (indexOfNewTask === -1) {
            indexOfNewTask = tasksCopy.findIndex(task => !task.startTime);
          }
        }
        if (indexOfNewTask === -1) {
          tasksCopy.push(newTask);
        } else {
          firstPartOfArray = tasksCopy.slice(0, indexOfNewTask );
          secondPartOfArray = tasksCopy.slice(indexOfNewTask);
          tasksCopy = [...firstPartOfArray, newTask, ...secondPartOfArray];
        }
      } else {
        tasksCopy.push(newTask);
      };
      return {
        ...state,
        createdTasksCount: state.createdTasksCount + 1,
        tasks: tasksCopy,
      }
    };
    case REMOVE_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks.filter(task => task.id !== action.id)
        ],
        viewedTask: null,
      }
    };
    case EDIT_TASK: {
      const editedTask = {id: action.id, ...action.taskData};
      return {
        ...state,
        tasks: [
          ...state.tasks.map(task => task.id === action.id ? editedTask : task)
        ],
        viewedTask: editedTask,
      }
    };
    case COMPLETE_TASK: {
      return {
        ...state,
        tasks: action.tasks
      }
    };
    case FIND_EXPIRED_TASKS: {
      if (!!state.tasks.length) {
        let result = [];
        state.tasks.forEach(task => {
          const currentTime = new Date();
          const finishTime = new Date(task?.finishTime);
          if ((task?.isExpired || finishTime < currentTime) && !task.isCompleted) {
            task.isExpired = 1;
            result.push(task);
          }
        })
        return {
          ...state,
          expiredTasks: result,
        }
      } else {
        return {
          ...state,
          expiredTasks: [],
        }
      }
    };
    case FIND_CURRENT_TASKS: {
      if (!!state.tasks.length) {
        let result = [];
        state.tasks.forEach(task => {
          const currentTime = new Date();
          const startTime = new Date(task?.startTime);
          const finishTime = new Date(task?.finishTime);
          if (startTime <= currentTime && finishTime > currentTime) {
            result.push(task);
          }
        })
        
        if (result.length === 0) {
          const currentTask = state.tasks.find(task => !task.isCompleted && !task.isExpired)
          currentTask ? result.push(currentTask) : null
        }
        return {
          ...state,
          currentTasks: result,
        }
      }
      return {
        ...state,
        currentTasks: [],
      }
    };
    case SET_TASK_EXPIRED: {
      const tasksCopy = [...state.tasks];
      const task = tasksCopy.find(task => task.id === action.id);
      if (task) {
        task.isExpired = 1;
        action.callBack();
        return {
          ...state,
          tasks: tasksCopy,
        };
      }
      return state;
    };
    case SHOW_TASK_DETAILS: {
      return {
        ...state,
        viewedTask: state.tasks.find(task => task.id === action.id),
      }
    };
    case UPDATE_RESULT: {
      const completedTasks = state.tasks.reduce((prev, task) => task.isCompleted ? prev + 1 : prev, 0);
      const expiredTasks = state.tasks.reduce((prev, task) => task.isExpired ? prev + 1 : prev, 0);
      const progress = Math.round((completedTasks / state.tasks.length) * 100) || 0;
      const tasksLeft = state.tasks.length - completedTasks;
      const completedInTime = state.tasks.reduce((prev, task) => task.isCompleted && task.isCompletedInTime ? prev + 1 : prev, 0);
      
      const result = {
        progress,
        completedTasks,
        expiredTasks,
        tasksLeft,
        completedInTime,
      };
      return {
        ...state,
        result,
      }
    };
    case UPDATE_STATS: {
      const tasksCount = Number(action.stats.tasksCount) + state.tasks.length;
      const completedInTimeCount = Number(action.stats.completedInTimeCount) + state.result.completedInTime;
      const completedTasksCount = Number(action.stats.completedTasksCount) + state.result.completedTasks;
      const workingDaysCount = Number(action.stats.workingDaysCount);

      const completedTasksPart = tasksCount ? Math.round((completedTasksCount / tasksCount) * 100) : 0;
      const dailyTaskCreatingAverage = workingDaysCount ? Math.round((tasksCount / workingDaysCount)) : 0;
      const completedInTime = completedTasksCount ? Math.round((completedInTimeCount/completedTasksCount) * 100 ) : 0;

      const stats = {
        completedTasksCount,
        completedTasksPart,
        dailyTaskCreatingAverage,
        completedInTime,
        currentDate: state.stats.currentDate,
      };

      return {
        ...state,
        stats,
      }
    };
    case ON_NEW_DAY_HANDLER: {
      if (action.date.toLocaleDateString() === state.currentDate) {
        return state;
      } else {
        //stats updating
        const tasksCount = state.stats.tasksCount + state.createdTasksCount;
        const workingDaysCount = state.stats.workingDaysCount + 1;
        const completedTasksCount = state.stats.completedTasksCount + state.result.completedTasks;
        const completedTasksPart = Math.round((completedTasksCount / tasksCount) * 100);
        const completedInTime = state.stats.completedInTime + state.result.completedInTime;
        const dailyTaskCreatingAverage = Math.round((tasksCount / workingDaysCount));
        const stats = {
          tasksCount,
          completedTasksCount,
          completedTasksPart,
          completedInTime,
          dailyTaskCreatingAverage,
          workingDaysCount,
        }

        //completed tasks removing
        let tasks = state.tasks.filter(task => !task.isCompleted);
        tasks = tasks.map(task => {
          return {...task, startTime: null, finishTime: null, isExpired: true}
        })

        return {
          ...state,
          currentDate: new Date().toString(),
          createdTasksCount: tasks.length,
          tasks,
          stats,
          expiredTasks: [],
          currentTasks: [],
          viewedTask: null,
          result: {
            progress: 0,
            completedTasks: 0,
            expiredTasks: 0,
            tasksLeft: 0,
            completedInTime: 0,
          }
        }
      }
    };
    default: {
      return state;
    }
  } 
}