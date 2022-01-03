import React, {useEffect, useContext} from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import { TasksContext } from '../context/tasks/TasksContext';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  const tasksCntxt = useContext(TasksContext);

  useEffect(() => {
    tasksCntxt.onNewDayHandler(new Date());
  });

  useEffect(() => {
    tasksCntxt.findExpiredTasks();
    tasksCntxt.findCurrentTasks();
    tasksCntxt.updateResult();
  }, [tasksCntxt.state.tasks]);

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
