import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const TargetData = ({target, complete}) => {
  
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ]

  let borderColor = colors.BLUE;
  let image = null;

  if (target?.isCompleted) {
    image = <Image 
      source={require('../../images/success.png')} 
      style={styles.successImage}
    />;
    borderColor = colors.SUCCESS
  } else if (target?.isExpired) {
    image = <Image 
      source={require('../../images/danger.png')} 
      style={styles.image}
    />;
    borderColor = colors.DANGER
  }

  let finishTimeString = 'Не указано';

  if (target?.finishTime) {
    finishTimeString = `${target.finishTime.getDate()} ${months[target.finishTime.getMonth()]} ${target.finishTime.getFullYear()} года`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>{target?.title}</Text>
        <TouchableOpacity 
          style={{...styles.button, borderColor}}
          onPress={complete}
        >
          {
            image
          }
        </TouchableOpacity>
      </View>
      {
        target?.description
        ? <Text style={styles.description}>{target?.description}</Text>
        : null
      }
      <View style={styles.timeBlock}>
        <Text style={styles.timeBlockTitle}>Выполнить до:</Text>
        <Text style={styles.time}>{finishTimeString}</Text>
      </View>
    </View>
  )
}

export default TargetData;

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