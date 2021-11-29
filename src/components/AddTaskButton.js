import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddTaskButton = ({showModal}) => (
  <TouchableOpacity
    onPress={showModal}
    style={styles.container}
  >
    <Text style={styles.icon}>+</Text>
  </TouchableOpacity>
)

export default AddTaskButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",   
    marginBottom: 20,
  },
  icon: {
    fontSize: 50,
    lineHeight: 50,
    color: '#fff',
    fontWeight: '200',
  },
})