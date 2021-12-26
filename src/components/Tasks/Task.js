import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image, TouchableWithoutFeedback, TouchableOpacityBase, Pressable, Platform } from "react-native";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";

const Task = ({task, showTaskDetails, completeTask}) => {

  let startTimeString = 'Не указано';
  let finishTimeString = 'Не указано';

  if (task.startTime) {
    const startHours = task.startTime.getHours() >= 10 ? `${task.startTime.getHours()}` : `0${task.startTime.getHours()}`;
    const startMinutes = task.startTime.getMinutes() >= 10 ? `${task.startTime.getMinutes()}` : `0${task.startTime.getMinutes()}`;
    startTimeString = `${startHours}:${startMinutes}`;
  }
  if (task.finishTime) {
    const finishHours = task.finishTime.getHours() >= 10 ? `${task.finishTime.getHours()}` : `0${task.finishTime.getHours()}`;
    const finishMinutes = task.finishTime.getMinutes() >= 10 ? `${task.finishTime.getMinutes()}` : `0${task.finishTime.getMinutes()}`;
    finishTimeString = `${finishHours}:${finishMinutes}`;
  }

  let borderColor = colors.BLUE;
  let image = null;

  if (task.isCompleted) {
    image = <Image 
      source={require('../../images/success.png')} 
      style={styles.successImage}
    />;
    borderColor = colors.SUCCESS
  } else if (task.isExpired) {
    image = <Image 
      source={require('../../images/danger.png')} 
      style={styles.image}
    />;
    borderColor = colors.DANGER
  }

  return (
    <TouchableOpacity 
      style={{...styles.container, ...shadow}}
      onLongPress={showTaskDetails}
      activeOpacity={0.5}
    >
      {
        task.startTime && task.finishTime 
          ? <View style={styles.textContent}>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.time}>{`${startTimeString} - ${finishTimeString}`}</Text>
            </View>
          : <Text style={styles.title}>{task.title}</Text>
      }
      
      <TouchableOpacity
        style={{...styles.button, borderColor}}
        onPress={completeTask}
      >
        {
          image
        }
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default Task;

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderColor: colors.BORDER_COLOR_ANDROID,
    borderWidth: Platform.OS === "ios" || Platform.OS === "macos" ? 0 : 1,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.BLUE,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 12,
    height: 12,
  },
  successImage: {
    width: 15,
    height: 12,
  },
  time: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 12,
  }
})