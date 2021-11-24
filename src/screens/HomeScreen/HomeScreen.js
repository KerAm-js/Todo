import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeMain from "./HomeMain";
import HomeSection from "./HomeSection";
import HomeSlideHeader from "../../components/headers/HomeSlideHeader";
import { StyleSheet } from "react-native";
import Statistics from "../../components/Statistics";

const Stack = createStackNavigator();

const slides = [
  {
    name: 'Statistics',
    image: require('../../images/omid-armin-nkb5BaISGFg-unsplash.jpg'),
    slideStyle: {
      marginLeft: 30
    },
    title: 'Ваша статистика',
    content: <Statistics />
  },
  {
    name: 'TimeManagement',
    image: require('../../images/yoshiko-evanka-q-8s0X1ClbY-unsplash.jpg'),
    slideStyle: {},
    title: 'Техники \nтайм-менеджмента',
  },
  {
    name: 'Productivity',
    image: require('../../images/behnam-norouzi-Qfdz7M2Cs9M-unsplash.jpg'),
    slideStyle: {
      marginRight: 30
    },
    title: 'Повышение продуктивности',
  },
];

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Main" style={styles.container}>
      <Stack.Screen 
        name="HomeMain" 
        options={{
          title: "Todo",
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30
          },
          headerTransparent: true,
        }}
      >
        {props => <HomeMain {...props} slides={slides} />}
      </Stack.Screen>
      {
        slides.map(({image, title, name, content}, index) => (
          <Stack.Screen 
            key={index}
            name={name}
            options={{
              title: "",
              header: (props) => <HomeSlideHeader {...props} />,
              headerTransparent: true,
            }}
          >
            {
              props => <HomeSection 
                {...props} 
                image={image} 
                title={title}
                content={content}
              />
            }
          </Stack.Screen>
        ))
      }
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
  },
})