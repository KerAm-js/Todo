export function addTaskWithSorting(tasks, task) {
  let tasksCopy = [...tasks];
  const newTask = task;

  if (newTask.startTime && tasksCopy.length > 0) {
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
  return tasksCopy;
}