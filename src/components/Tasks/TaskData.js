import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const TaskData = ({task, completeTask}) => {

  let borderColor = colors.BLUE;
  let image = null;

  if (task?.isCompleted) {
    image = <Image 
      source={require('../../images/success.png')} 
      style={styles.successImage}
    />;
    borderColor = colors.SUCCESS
  } else if (task?.isExpired) {
    image = <Image 
      source={require('../../images/danger.png')} 
      style={styles.image}
    />;
    borderColor = colors.DANGER
  }

  let startTimeString = 'Не указано';
  let finishTimeString = 'Не указано';

  if (task?.startTime) {
    const startHours = task.startTime.getHours() >= 10 ? `${task.startTime.getHours()}` : `0${task.startTime.getHours()}`;
    const startMinutes = task.startTime.getMinutes() >= 10 ? `${task.startTime.getMinutes()}` : `0${task.startTime.getMinutes()}`;
    startTimeString = `${startHours}:${startMinutes}`;
  }
  if (task?.finishTime) {
    const finishHours = task.finishTime.getHours() >= 10 ? `${task.finishTime.getHours()}` : `0${task.finishTime.getHours()}`;
    const finishMinutes = task.finishTime.getMinutes() >= 10 ? `${task.finishTime.getMinutes()}` : `0${task.finishTime.getMinutes()}`;
    finishTimeString = `${finishHours}:${finishMinutes}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>{task?.title}</Text>
        <TouchableOpacity 
          style={{...styles.button, borderColor}}
          onPress={completeTask}
        >
          {
            image
          }
        </TouchableOpacity>
      </View>
      {
        task?.description
        ? <Text style={styles.description}>{task?.description}</Text>
        : null
      }
      <View style={styles.timeBlock}>
        <Text style={styles.timeBlockTitle}>Начальное время:</Text>
        <Text style={styles.time}>{startTimeString}</Text>
      </View>
      <View style={styles.timeBlock}>
        <Text style={styles.timeBlockTitle}>Конечное время:</Text>
        <Text style={styles.time}>{finishTimeString}</Text>
      </View>
    </View>
  )
}

export default TaskData;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
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
  timeBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeBlockTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  time: {
    fontSize: 18,
    marginBottom: 10,
  },
})