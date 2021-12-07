import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const images = [
  {
    title: 'Все задачи',
    image: require('../../images/allTodo.png'),
    active: true,
  },
  {
    title: 'Просрочено',
    image: require('../../images/dangerEllipse.png'),
    active: false,
  },
  {
    title: 'Выполнено',
    image: require('../../images/successEllipse.png'),
    active: false,
  },
]

const TasksHeader = (props) => {
  return (
    // <ScrollView 
    //   style={styles.container}
    //   horizontal={true}
    //   showsHorizontalScrollIndicator={false}
    // >
      <View style={styles.container}>
        {
          images.map(({image, title, active}, index) => {

            let buttonStyle = {
              ...styles.button,
              marginLeft: index === 0 ? 20 : 0
            }

            let titleStyle = {
              ...styles.title,
            }

            if (active) {
              buttonStyle = {
                ...styles.button,
                ...styles.buttonActive,
                marginLeft: index === 0 ? 20 : 0
              };
              titleStyle = {
                ...styles.title,
                ...styles.titleActive,
              }
            }

            return (
              <TouchableOpacity 
                key={index}
                style={buttonStyle}
                onPress={() => console.log('pressed')}
              >
                <Image 
                  style={styles.image} 
                  source={image}
                />
                <Text style={titleStyle}>{title}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    // </ScrollView>
  )
}

export default TasksHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
    position: "absolute",
    width: '100%',
    height: '100%',
    backgroundColor: colors.ACCENT,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: 'rgba(250, 250, 250, .2)',
    borderRadius: 20,
    marginRight: 20,
  },
  buttonActive: {
    backgroundColor: '#fff',
  },
  image: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
  titleActive: {
    color: '#000'
  },
})