import { 
  ADD_TASK,
  EDIT_TASK,
  REMOVE_TASK,
  COMPLETE_TASK,
  FIND_EXPIRED_TASKS,
  FIND_CURRENT_TASKS,
  SHOW_TASK_DETAILS,
  SET_TASK_TIMEOUT, 
  UPDATE_RESULT,
} from "./constants";

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.task,
        ],
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
      const tasksCopy = [...state.tasks];
      tasksCopy.forEach(task => {
        task.id === action.id ? task.isCompleted = !task.isCompleted : null;
      })
      return {
        ...state,
        tasks: [
          ...tasksCopy
        ]
      }
    };
    case FIND_EXPIRED_TASKS: {
      if (state.tasks.length > 0) {
        let result = [];
        const currentTime = new Date();
        state.tasks.forEach(task => {
          if (task?.finishTime && task?.finishTime <= currentTime && !task?.isCompleted) {
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
      if (state.tasks.length > 0) {
        let result = [];
        const currentTime = new Date();
        state.tasks.forEach(task => {
          if (task?.startTime <= currentTime && task?.finishTime > currentTime && !task?.isExpired) {
            result.push(task);
          }
        })
        if (result.length === 0) {
          const currentTask = state.tasks.find(task => !task.isCompleted && !task.isExpired)
          currentTask ? result.push(currentTask) : null
        }
        return {
          ...state,
          currentTasks: result
        }
      } else {
        return {
          ...state,
          currentTasks: [],
        }
      }
    };
    case SET_TASK_TIMEOUT: {
      if (action.start && action.end && new Date() < action.end) {
        setTimeout(() => {
          const tasksCopy = [...state.tasks];
          tasksCopy.find(task => task.id === action.id).isExpired = true;
          return tasksCopy;
        }, action.end - new Date());
      }
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
      const progress = Math.round((completedTasks / state.tasks.length) * 100);
      const tasksLeft = state.tasks.length - completedTasks;
      return {
        ...state,
        result: {
          progress,
          completedTasks,
          expiredTasks,
          tasksLeft,
        }
      }
    }
    default: {
      return state;
    }
  } 
}