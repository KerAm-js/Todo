import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../../constants/shadows";
import { colors } from "../../constants/colors";
import Task from "../Tasks/Task";
import { textStyles } from "../../constants/textStyles";

const HomeExpiredTasks = ({expiredTasks, completeTask, showTaskDetails, navigation}) => {
  const title = 'Просрочено';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {
        expiredTasks.map((task, index) => {
          return (
            <Task 
              key={index}
              task={task} 
              complete={() => completeTask(task.id)}
              showDetails={() => showTaskDetails(task.id, navigation)}
            />
          )
        })
      }
    </View>
  )
}

export default HomeExpiredTasks;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  block: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    borderColor: colors.BORDER_COLOR_ANDROID,
    padding: 20,
    minHeight: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  title: {
    ...textStyles.title,
    marginBottom: 20,
  },
  textContent: {
    minHeight: 40,
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "#fff",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.BLUE,
  },
});