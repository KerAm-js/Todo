import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";


const TasksScreenButtons = ({addButton, deleteButton}) => {
  return (
    <View style={{...styles.container}}>
      <TouchableOpacity
        onPress={addButton}
        style={styles.leftButton}
      >
        <Image 
          source={require('../../images/plusWhite.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={deleteButton}
        style={styles.rightButton}
      >
        <Image 
          source={require('../../images/binWhite.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}

export default TasksScreenButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    bottom: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  leftButton: {
    width: 60,
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.ACCENT,
    justifyContent: "center",
    alignItems: "center",   
  },
  rightButton: {
    width: 60,
    height: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.DANGER,
    justifyContent: "center",
    alignItems: "center",   
  },
  icon: {
    width: 16,
    height: 16,
  },
})
