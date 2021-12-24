import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskViewing from '../screens/TaskViewing';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {

  const [currentTasks, setCurrentTasks] = useState([]);
  const [expiredTasks, setExpiredTasks] = useState([]);
  const [viewedTask, setViewedTask] = useState();
  const [tasks, setTasks] = useState([{
    id: `0_${new Date()}`,
    title: "Задача 1",
    description: null,
    startTime: null,
    finishTime: null,
    isCompleted: false,
    isExpired: false, 
  }]);

  const addTask = task => {
    setTasks(prev => [...prev, task]);
    taskTimout(task.id, task.startTime, task.finishTime);
  }

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
    setExpiredTasks(expiredTasks.filter(task => task.id !== id));
    setViewedTask(null);
  }

  const completeTask = id => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach(task => {
      task.id === id ? task.isCompleted = !task.isCompleted : null;
    })
    setTasks(tasksCopy);
  }

  const findExpiredTasks = () => {
    if (tasks.length > 0) {
      let result = [];
      const currentTime = new Date();
      tasks.forEach(task => {
        if (task?.finishTime && task?.finishTime <= currentTime && !task?.isCompleted) {
          result.push(task);
        }
      })
      setExpiredTasks(result);
    }
  }

  const findCurrentTasks = () => {
    if (tasks.length > 0) {
      let result = [];
      const currentTime = new Date();
      tasks.forEach(task => {
        if (task?.startTime <= currentTime && task?.finishTime > currentTime && !task?.isExpired) {
          result.push(task);
        }
      })
      if (result.length === 0) {
        const currentTask = tasks.find(task => !task.isCompleted && !task.isExpired)
        currentTask ? result.push(currentTask) : null
      }
      setCurrentTasks(result);
    }
  }

  const editTask = (id, taskData) => {
    setTasks(tasks.map(task => task.id === id ? {id, ...taskData} : task));
    taskTimout(id, taskData.startTime, taskData.finishTime);
    setViewedTask({id, ...taskData});
  }

  const taskTimout = (id, start, end) => {
    if (start && end && new Date() < end) {
      setTimeout(() => {
        setTasks(prev => {
          const tasksCopy = [...prev];
          tasksCopy[id].isExpired = true
          return tasksCopy;
        });
      }, end - new Date());
    }
  }

  const showTaskDetails = (id, navigation) => {
    setViewedTask(tasks.find(task => task.id === id));
    navigation.navigate("Viewing");
  }

  useEffect(() => {
    findCurrentTasks();
    findExpiredTasks();
  }, [tasks]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Group
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen
            name="Root"
          >
            {
              props => <TabNavigator 
                {...props}
                currentTasks={currentTasks}
                setCurrentTasks={setCurrentTasks}
                expiredTasks={expiredTasks}
                tasks={tasks}
                setTasks={setTasks}
                viewedTask={viewedTask}
                setViewedTask={setViewedTask}
                addTask={addTask}
                removeTask={removeTask}
                completeTask={completeTask}
                showTaskDetails={showTaskDetails}
              />
            }
          </Stack.Screen>
          <Stack.Screen
            name="Viewing"
          >
            {
              props => <TaskViewing 
                {...props} 
                task={viewedTask} 
                completeTask={() => completeTask(viewedTask.id)}
                removeTask={() => removeTask(viewedTask.id)}
                editTask={taskData => editTask(viewedTask.id, taskData)}
              />
            }
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
