import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeToday = () => {

  const weekDays = [
    undefined,
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
    "воскресенье",
  ]

  const date = new Date();
  const dayString = `${date.getDate()} ${weekDays[date.getDay()]}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сегодня</Text>
      <Text style={styles.subtitle}>{dayString}</Text>
    </View>
  )
}

export default HomeToday;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 20,
  },
})