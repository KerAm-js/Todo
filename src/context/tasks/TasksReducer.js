import { addTaskWithSorting } from "../../utils/utils";
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
  UPLOAD_STATS,
  ADD_NOTIFICATION,
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
      const tasks = addTaskWithSorting(state.tasks, action.task);
      return {
        ...state,
        tasks,
        createdTasksCount: state.createdTasksCount + 1,
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
      const beforeEditing = state.tasks.find(task => task.id === action.id);
      const isTimeEdited = editedTask.startTime === beforeEditing.startTime && editedTask.finishTime === beforeEditing.finishTime;
      if (isTimeEdited) {
        return {
          ...state,
          tasks: [
            ...state.tasks.map(task => task.id === action.id ? editedTask : task)
          ],
          viewedTask: editedTask,
        }
      }
      const tasksWithoutEditedTask = [...state.tasks.filter(task => task.id !== action.id)];
      const sortedTasks = addTaskWithSorting(tasksWithoutEditedTask, editedTask);
      return {
        ...state,
        tasks: sortedTasks,
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
          if (task.finishTime && !task.isCompleted) {
            const currentTime = new Date();
            const finishTime = new Date(task?.finishTime);
            if ((task?.isExpired || finishTime < currentTime) && !task.isCompleted) {
              task.isExpired = 1;
              result.push(task);
            }
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
          if (task.startTime) {
            result.push(task);
          }
        });
        if (!!result.length) {
          result = result.filter(task => {
            const currentTime = new Date();
            const startTime = new Date(task?.startTime);
            const finishTime = new Date(task?.finishTime);
            if (startTime <= currentTime && finishTime > currentTime) {
              return true;
            } else {
              return false;
            }
          });
        } 
        if (!result.length) {
          const currentTask = state.tasks.find(task => !task.isCompleted && !task.isExpired && !task.startTime)
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
      if (task && !task.isCompleted) {
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
      const result = action.getResult(state.tasks);
      return {
        ...state,
        result,
      }
    };
    case UPDATE_STATS: {
      const stats = action.getStatsForReducer(state.tasks, state.result);
      return {
        ...state,
        stats,
      }
    };
    case UPLOAD_STATS: {
      return {
        ...state,
        stats: action.stats,
      }
    };
    case ON_NEW_DAY_HANDLER: {
      return {
        ...state,
        tasks: action.tasks,
      }
    };
    case ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.notification,
        ]
      }
    }
    default: {
      return state;
    }
  } 
}