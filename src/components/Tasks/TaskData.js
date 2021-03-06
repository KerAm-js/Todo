import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";

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

  const startTime = new Date(task?.startTime);
  const finishTime = new Date(task?.finishTime);

  if (task?.startTime) {
    const startHours = startTime.getHours() >= 10 ? `${startTime.getHours()}` : `0${startTime.getHours()}`;
    const startMinutes = startTime.getMinutes() >= 10 ? `${startTime.getMinutes()}` : `0${startTime.getMinutes()}`;
    startTimeString = `${startHours}:${startMinutes}`;
  }
  if (task?.finishTime) {
    const finishHours = finishTime.getHours() >= 10 ? `${finishTime.getHours()}` : `0${finishTime.getHours()}`;
    const finishMinutes = finishTime.getMinutes() >= 10 ? `${finishTime.getMinutes()}` : `0${finishTime.getMinutes()}`;
    finishTimeString = `${finishHours}:${finishMinutes}`;
  }

  return (
    <View style={{...styles.container, ...shadow}}>
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
    marginHorizontal: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    ...textStyles.title,
    maxWidth: '80%',
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
    ...textStyles.regular,
    marginBottom: 20,
  },
  timeBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeBlockTitle: {
    ...textStyles.regular,
    marginBottom: 5,
  },
  time: {
    ...textStyles.regular,
    marginBottom: 10,
  },
})