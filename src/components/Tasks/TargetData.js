import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";

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
    finishTimeString = `${target.finishTime.getDate()} ${months[target.finishTime.getMonth()]} ${target.finishTime.getFullYear()} г.`;
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
    ...textStyles.title,
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