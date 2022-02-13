import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image, TouchableWithoutFeedback, TouchableOpacityBase, Pressable, Platform, ShadowPropTypesIOS } from "react-native";
import { colors } from "../../constants/colors";
import { androidShadow, shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";

const Task = ({task, showDetails, complete, style}) => {
  let startTimeString = 'Не указано';
  let finishTimeString = 'Не указано';

  const startTime = new Date(task.startTime);
  const finishTime = new Date(task.finishTime);

  if (task.startTime) {
    const startHours = startTime.getHours() >= 10 ? `${startTime.getHours()}` : `0${startTime.getHours()}`;
    const startMinutes = startTime.getMinutes() >= 10 ? `${startTime.getMinutes()}` : `0${startTime.getMinutes()}`;
    startTimeString = `${startHours}:${startMinutes}`;
  }
  if (task.finishTime) {
    const finishHours = finishTime.getHours() >= 10 ? `${finishTime.getHours()}` : `0${finishTime.getHours()}`;
    const finishMinutes = finishTime.getMinutes() >= 10 ? `${finishTime.getMinutes()}` : `0${finishTime.getMinutes()}`;
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

  let blockShadow = {
    ...shadow
  }

  if (Platform.OS === 'android') {
    blockShadow = {
      ...androidShadow,
      elevation: 5,
    }
  }
  return (
    <TouchableOpacity 
      style={{...styles.container, ...blockShadow, ...style}}
      onLongPress={showDetails}
      activeOpacity={0.5}
    >
      <View style={styles.textContent}>
        {
          task.startTime && task.finishTime 
            ? <>
                <Text numberOfLines={1} style={styles.title}>{task.title}</Text>
                <Text style={styles.time}>{`${startTimeString} - ${finishTimeString}`}</Text>
              </>
            : <Text numberOfLines={1} style={styles.title}>{task.title}</Text>
        }
      </View>
      <TouchableOpacity
        style={{...styles.button, borderColor}}
        onPress={complete}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    ...textStyles.regular,
  },
  textContent: {
    width: '80%'
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
    marginTop: 5,
    ...textStyles.extraSmall,
  },
})