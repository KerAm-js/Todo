import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { androidShadow, shadow } from "../../constants/shadows";
import { colors } from "../../constants/colors";
import Task from "../Tasks/Task";
import { textStyles } from "../../constants/textStyles";

const HomeCurrentTask = ({currentTasks, completeTask, showTaskDetails, navigation}) => {
  const title = currentTasks.length === 1 || currentTasks.length === 0 
    ? 'Текущая задача' 
    : 'Текущие задачи';

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
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {
        currentTasks.length !== 0
          ? currentTasks.map((task, index) => {
              return (
                <Task 
                  key={index}
                  task={task} 
                  complete={() => completeTask(task.id)}
                  showDetails={() => showTaskDetails(task.id, navigation)}
                />
              )
            })
          : <View style={{...styles.block, ...blockShadow}}>
              <Text style={styles.noTasks}>Нет задач, назначенных на текущее время</Text>
            </View>
      }
    </View>
  )
}

export default HomeCurrentTask;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  block: {
    backgroundColor: "#fff",
    borderRadius: 20,
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
  noTasks: {
    ...textStyles.regular
  },
});