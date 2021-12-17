import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgSuccess, SvgDanger } from "../../icons/icons";
import { colors } from "../constants/colors";

const TaskData = ({task}) => {

  let borderColor = colors.BLUE;
  let image = null;

  if (task.isCompleted) {
    image = <Image 
      source={require('../../images/success.png')} 
      style={styles.successImage}
    />;
    borderColor = colors.SUCCESS
  } else if (task.isLate) {
    image = <Image 
      source={require('../../images/danger.png')} 
      style={styles.image}
    />;
    borderColor = colors.DANGER
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>{task.title}</Text>
        <TouchableOpacity 
          style={{...styles.button, borderColor}}
          onPress={() => console.log('pressed')}
        >
          {
            image
          }
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.time}>{task.startTime}</Text>
      <Text style={styles.time}>{task.finishTime}</Text>
    </View>
  )
}

export default TaskData;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
  },
  image: {
    width: 16,
    height: 16,
  },
  successImage: {
    width: 20,
    height: 16,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  time: {
    fontSize: 16,
    marginBottom: 10,
  },
})