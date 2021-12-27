import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image, TouchableWithoutFeedback, TouchableOpacityBase, Pressable, Platform } from "react-native";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";


const Target = ({target, complete, showDetails}) => {

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

  let finishTimeString = 'Не указано';
  if (target?.finishTime) {
    finishTimeString = `${target?.finishTime.getDate()} ${months[target?.finishTime.getMonth()]}`;
  }
  let borderColor = colors.BLUE;
  let image = null;

  if (target.isCompleted) {
    image = <Image 
      source={require('../../images/success.png')} 
      style={styles.successImage}
    />;
    borderColor = colors.SUCCESS
  } else if (target.isExpired) {
    image = <Image 
      source={require('../../images/danger.png')} 
      style={styles.image}
    />;
    borderColor = colors.DANGER
  }

  return (
    <TouchableOpacity 
      style={{...styles.container, ...shadow}}
      onLongPress={showDetails}
      activeOpacity={0.5}
    >
      {
        target.finishTime 
          ? <View style={styles.textContent}>
              <Text style={styles.title}>{target.title}</Text>
              <Text style={styles.time}>{`${finishTimeString}`}</Text>
            </View>
          : <Text style={styles.title}>{target.title}</Text>
      }
      
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

export default Target;

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
    padding: 20,
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
    lineHeight: 18,
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
    fontSize: 14,
    lineHeight: 14,
  }
})