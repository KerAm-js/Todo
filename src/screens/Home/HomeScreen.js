import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Main";
import Statistics from "./Statistics";
import Productivity from "./Productivity";
import TimeManagement from "./TimeManagement";


const Stack = createStackNavigator();
const slides = [
  {
    name: 'Statistics',
    image: require('../../images/statistical.png'),
    headingImage: require('../../images/statistics-white.png'),
    title: 'Статистика',
    component: props => <Statistics {...props} />,
  },
  {
    name: 'TimeManagement',
    image: require('../../images/timer.png'),
    headingImage: require('../../images/timer-white.png'),
    slideStyle: {},
    title: 'Тайм-менеджмент',
    component: props => <TimeManagement {...props} />,
  },
  {
    name: 'Productivity',
    image: require('../../images/productivity.png'),
    headingImage: require('../../images/rocket-white.png'),
    title: 'Продуктивность',
    component: props => <Productivity {...props} />,
  },
];

const HomeScreen = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Main"
    >
      <Stack.Screen 
        name="HomeMain" 
        options={{
          title: "",
          headerShown: false
        }}
      >
        {props => <Main 
          {...props} 
          slides={slides} 
        />}
      </Stack.Screen>
      <Stack.Group screenOptions={{
        presentation: "card",
        headerShown: false,
      }}>
        {
          slides.map(({name, component, title, headingImage }, index) => (
            <Stack.Screen
              key={index}
              name={name}
              options={{
                title: ""
              }}
            >
              {props => component({ title, image: headingImage, ...props,})}
            </Stack.Screen>
          ))
        }
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeScreen;