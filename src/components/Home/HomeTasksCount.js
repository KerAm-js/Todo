import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../../constants/shadows";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";


const HomeTasksCount = ({count, navigation}) => {

  let tasksCountString = 'задач';
  let title = 'Запланировано';

  if (count === 0) {
    null
  } else if (count === 1) {
    tasksCountString = 'задача';
  } else if (count <= 4) {
    tasksCountString = 'задачи';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={{...styles.block, ...shadow}}>
        <Text style={styles.text}>{`${count} ${tasksCountString}`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Tasks")}
        >
          <Image 
            source={require('../../images/plus.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeTasksCount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  block: {
    backgroundColor: "#fff",
    padding: 20,
    minHeight: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Platform.OS === 'ios' ? "#fff" : colors.LIGHTBLUE,
  },
  title: {
    ...textStyles.title,
    marginBottom: 20,
  },
  image: {
    width: 16,
    height: 16,
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
  text: {
    ...textStyles.regular,
  },
});