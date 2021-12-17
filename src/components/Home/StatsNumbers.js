import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/colors";
import { shadow } from "../constants/shadows";


const StatsNumbers = () => {
  return (
    <View style={styles.stats}>
      <View style={styles.column}>

        <View style={styles.blueBlock}>
          <View style={styles.blueBlockBackground}>
            <Text style={styles.valueBigSize}>238</Text>
            <Text style={styles.title}>{`задач\n выполнено за\n всё время`}</Text>
          </View>
        </View>

        <View style={styles.whiteBlock}>
          <View style={styles.circle}>
            <Text style={styles.value}>81%</Text>
          </View>
          <Text style={styles.title}>{`задач\n выполнено`}</Text>
        </View>

      </View>
      <View style={styles.column}>

        <View style={styles.whiteBlock}>
          <View style={styles.circle}>
            <Text style={styles.value}>35%</Text>
          </View>
          <Text style={styles.title}>{`выполнено\n в срок`}</Text>
        </View>

        <View style={styles.blueBlock}>
          <View style={styles.blueBlockBackground}>
            <Text style={styles.valueBigSize}>5</Text>
            <Text style={styles.title}>{`задач\n в среднем\n создаётся в день`}</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

export default StatsNumbers;

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  column: {
    flex: 1,
  },
  whiteBlock: {
    minHeight: 190,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    borderColor: '#eee',
    ...shadow,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: '#fff',
    margin: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  blueBlock: {
    backgroundColor: '#fff',
    borderRadius: 20,
    minHeight: 170,
    margin: 10,
    ...shadow,
  },
  blueBlockBackground: {
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.LIGHTBLUE,
    paddingVertical: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  circle: {
    marginTop: 15,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 25,
  },  
  valueBigSize: {
    fontSize: 40,
    marginTop: 10,
  },
})