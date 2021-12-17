import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgPlus } from "../../icons/icons";
import { colors } from "../constants/colors";

const AddTaskButton = ({showModal}) => (
  <TouchableOpacity
    onPress={showModal}
    style={styles.container}
  >
    <SvgPlus />
  </TouchableOpacity>
)

export default AddTaskButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderColor: colors.BLUE,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",   
    marginBottom: 20,
  },
  icon: {
    fontSize: 50,
    lineHeight: 50,
    color: colors.ACCENT,
    fontWeight: '200',
  },
})