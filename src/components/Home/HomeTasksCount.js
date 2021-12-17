import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../constants/shadows";
import { colors } from "../constants/colors";
import { SvgPlus } from "../../icons/icons";


const HomeTasksCount = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Запланировано</Text>
      <View style={{...styles.block, ...shadow}}>
        <Text style={styles.text}>10 задач</Text>
        <TouchableOpacity
          style={styles.button}
        >
          <SvgPlus />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeTasksCount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  block: {
    backgroundColor: colors.LIGHTBLUE,
    padding: 20,
    minHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: Platform.OS === 'ios' ? 20 : 10,
  },
  title: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 20,
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
  text: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 10,
  },
});