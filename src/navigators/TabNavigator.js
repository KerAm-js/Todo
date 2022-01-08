import React, {useEffect, useContext, useCallback} from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import { TasksContext } from '../context/tasks/TasksContext';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  const tasksCntxt = useContext(TasksContext);

  const dataUpdating = useCallback(async () => {
    await tasksCntxt.findExpiredTasks();
    await tasksCntxt.findCurrentTasks();
    await tasksCntxt.updateResult();
    await tasksCntxt.updateStats();
    await tasksCntxt.updateNotifications();
  })

  useEffect(async () => {
    dataUpdating();
  }, [tasksCntxt.state.tasks]);

  // useEffect(async () => {
  //   await tasksCntxt.onNewDayHandler();
  // }, [])

  return (
    <Tab.Navigator 
      initialRouteName="Tasks" 
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen 
        name="Home"  
        options={{
          title: "",
          headerShown: false
        }}
      >
        {
          props => <HomeScreen 
            {...props} 
          />
        }
      </Tab.Screen>
      <Tab.Screen 
        name="Tasks" 
        options={{
          title: "",
          headerShown: false,
          tabBarLabel: "Tasks",
        }}
      >
        {
          props => <TasksScreen 
            {...props} 
          />
        }
      </Tab.Screen>
      <Tab.Screen 
        name="Profile" 
        options={{
          title: "",
          headerShown: false,
          tabBarLabel: "Profile",
        }}
      >
        {
          props => <ProfileScreen 
            {...props}
          />
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}
