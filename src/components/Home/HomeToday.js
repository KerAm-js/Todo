import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";

const HomeToday = () => {

  const weekDays = [
    undefined,
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ]

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "май",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ]

  const date = new Date();
  const dateString = `${weekDays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сегодня</Text>
      <View style={{...styles.block, ...shadow}}>
        <Text style={styles.subtitle}>{dateString}</Text>
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
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '600',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 18,
  },
  block: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: colors.BORDER_COLOR_ANDROID,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    padding: 20,
    minHeight: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  }
})