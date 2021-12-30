import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";

const HomeToday = () => {

  const weekDays = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ]

  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Май",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ]

  const date = new Date();
  const dateString = `${date.getDate()} ${months[date.getMonth()]}, ${weekDays[date.getDay()]}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сегодня</Text>
      <View style={{...styles.block, ...shadow}}>
        <Text style={styles.text}>{dateString}</Text>
      </View>
    </View>
  )
}

export default HomeToday;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  title: {
    ...textStyles.title,
    marginBottom: 20,
  },
  text: {
    ...textStyles.regular,
  },
  block: {
    backgroundColor: Platform.OS === 'ios' ? "#fff" : colors.LIGHTBLUE,
    borderRadius: 20,
    padding: 20,
    minHeight: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  }
})