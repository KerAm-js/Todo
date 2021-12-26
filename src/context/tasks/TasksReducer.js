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
  ON_NEW_DAY_HANDLER,
} from "./constants";

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        createdTasksCount: state.createdTasksCount + 1,
        tasks: [
          ...state.tasks,
          action.task,
        ],
      }
    };
    case REMOVE_TASK: {
      let createdTasksCount = state.createdTasksCount;
      if (!state.tasks.find(task => task.id === action.id).isDayExpired) {
        createdTasksCount -= 1;
      } 
      return {
        ...state,
        createdTasksCount,
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
      const progress = Math.round((completedTasks / state.tasks.length) * 100) || 0;
      const tasksLeft = state.tasks.length - completedTasks;
      const completedInTime = state.tasks.reduce((prev, task) => task.isCompleted && !task.isExpired ? prev + 1 : prev, 0);
      
      return {
        ...state,
        result: {
          progress,
          completedTasks,
          expiredTasks,
          tasksLeft,
          completedInTime,
        }
      }
    };
    case ON_NEW_DAY_HANDLER: {
    
      const isDayEvaluate = state.currentDate.getDate() === action.date.getDate();
      const isMonthEvaluate = state.currentDate.getMonth() === action.date.getMonth();
      const isYearEvaluate = state.currentDate.getFullYear() === action.date.getFullYear();
      const isSecondEvaluate = state.currentDate.getSeconds() + 20 > action.date.getSeconds();
      
      if (isDayEvaluate && isMonthEvaluate && isYearEvaluate && isSecondEvaluate) {
        console.log('no update');
      } else {
        console.log('updated');
        //stats updating
        const tasksCount = state.stats.tasksCount + state.createdTasksCount;
        const workingDaysCount = state.stats.workingDaysCount + 1;
        const completedTasksCount = state.stats.completedTasksCount + state.result.completedTasks;
        const completedTasksPart = Math.round((completedTasksCount / tasksCount) * 100);
        const completedInTime = state.stats.completedInTime + state.result.completedInTime;
        const dailyTaskCreatingAverage = Math.round((tasksCount / workingDaysCount) * 100);
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
          return {...task, startTime: null, finishTime: null, isDayExpired: true, isExpired: true}
        })

        return {
          ...state,
          currentDate: new Date(),
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