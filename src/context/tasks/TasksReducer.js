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
} from "./types";

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_TASKS: {
      return {
        currentDate: action.currentDate,
        createdTasksCount: action.currentDate,
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

      if (newTask.startTime) {
        let indexOfNewTask;
        let firstPartOfArray;
        let secondPartOfArray;

        const newTaskStart = newTask.startTime;
        const newTaskFinish = newTask.finishTime;

        let firstIndex = tasksCopy.findIndex(task => {
          if (task.startTime?.slice(16,21) === newTaskStart.slice(16,21)) {
            return true;
          }
        })

        if (firstIndex !== -1) {

          const tasksWithSameStart = tasksCopy.filter(task => {
            if (task.startTime?.slice(16,21) === newTaskStart.slice(16,21)) {
              return true;
            }
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
            if (task.startTime?.slice(16,21) > newTaskStart.slice(16,21)) {
              return true;
            }
          });
          if (indexOfNewTask === -1) {
            indexOfNewTask = tasksCopy.findIndex(task => !task.startTime);
          }
        }
        firstPartOfArray = tasksCopy.slice(0, indexOfNewTask );
        secondPartOfArray = tasksCopy.slice(indexOfNewTask);
        tasksCopy = [...firstPartOfArray, newTask, ...secondPartOfArray];
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
      if (!state.tasks.length) {
        let result = [];
        state.tasks.forEach(task => {
          if ((task?.isExpired || task?.isDayExpired) && !task.isCompleted) {
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
      if (!state.tasks.length) {
        let result = [];
        const currentTime = new Date();

        state.tasks.forEach(task => {
          const startTime = new Date(task?.startTime);
          const finishTime = new Date(task?.finishTime);
          if (startTime <= currentTime && finishTime > currentTime && !task?.isExpired && !task?.isDayExpired) {
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
        task.isExpired = true;
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
      if (action.date.toLocaleDateString() === new Date(state.currentDate).toLocaleDateString()) {
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
          return {...task, startTime: null, finishTime: null, isDayExpired: true, isExpired: true}
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