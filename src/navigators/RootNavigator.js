import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskViewing from '../screens/TaskViewing';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {

  const [currentTasks, setCurrentTasks] = useState([]);
  const [tasks, setTasks] = useState([{
    id: 0,
    title: "Задача 1",
    description: null,
    startTime: null,
    finishTime: null,
    isCompleted: false,
    isExpired: false, 
  }]);
  const [viewedTask, setViewedTask] = useState(null);

  const addTask = task => {
    setTasks(prev => [...prev, task]);
    if (task.startTime && task.finishTime) {
      setTimeout(() => {
        setTasks(prev => {
          const tasksCopy = [...prev];
          tasksCopy[task.id].isExpired = true
          return tasksCopy;
        });
      }, task.finishTime - new Date());
    }
  }

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
    setViewedTask(null);
  }

  const completeTask = id => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach(task => {
      task.id === id ? task.isCompleted = !task.isCompleted : null;
    })
    setTasks(tasksCopy);
  }


  const findCurrentTasks = () => {
    if (tasks.length > 0) {
      let result = [];
      const currentTime = new Date();
      tasks.forEach(task => {
        if (task?.startTime <= currentTime && task?.finishTime >= currentTime) {
          result.push(task);
        }
      })
      if (result.length === 0) {
        const currentTask = tasks.find(task => !task.isCompleted)
        currentTask ? result.push(currentTask) : null
      }
      console.log(result);
      setCurrentTasks(result);
    }
  }

  const showTaskDetails = (id, navigation) => {
    setViewedTask(tasks.find(task => task.id === id))
    navigation.navigate("Viewing")
  }

  useEffect(() => {
    findCurrentTasks();
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
                tasks={tasks}
                setTasks={setTasks}
                viewedTask={viewedTask}
                setViewedTask={setViewedTask}
                addTask={addTask}
                removeTask={removeTask}
                completeTask={completeTask}
                findCurrentTasks={findCurrentTasks}
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
              />
            }
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
