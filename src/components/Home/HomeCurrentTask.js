import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../constants/shadows";
import { colors } from "../constants/colors";

const HomeCurrentTask = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Текущая задача</Text>
      <View style={{...styles.block, ...shadow}}>
        <View style={styles.textContent}>
          <Text style={styles.taskName}>Task name</Text>
          <Text style={styles.taskTime}>8:00 - 9:00</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
        >
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeCurrentTask;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  block: {
    backgroundColor: colors.LIGHTBLUE,
    borderRadius: Platform.OS === 'ios' ? 20 : 10,
    padding: 20,
    minHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 20,
  },
  textContent: {
    minHeight: 40,
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.BLUE,
  },
  taskName: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 10,
  },
  taskTime: {
    fontSize: 16,
    lineHeight: 20,
  },
});