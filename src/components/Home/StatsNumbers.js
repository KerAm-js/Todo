import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../constants/colors";
import { shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";


const StatsNumbers = ({stats}) => {
  return (
    <View style={styles.stats}>
      <View style={styles.column}>

        <View style={styles.blueBlock}>
          <View style={styles.blueBlockBackground}>
            <Text style={styles.valueBigSize}>{stats.completedTasksCount}</Text>
            <Text style={styles.title}>{`задач\n выполнено за\n всё время`}</Text>
          </View>
        </View>

        <View style={styles.whiteBlock}>
          <View style={styles.circle}>
            <Text style={styles.value}>{`${stats.completedTasksPart}%`}</Text>
          </View>
          <Text style={styles.title}>{`задач\n выполнено`}</Text>
        </View>

      </View>
      <View style={styles.column}>

        <View style={styles.whiteBlock}>
          <View style={styles.circle}>
            <Text style={styles.value}>{`${stats.completedInTime}%`}</Text>
          </View>
          <Text style={styles.title}>{`выполнено\n в срок`}</Text>
        </View>

        <View style={styles.blueBlock}>
          <View style={styles.blueBlockBackground}>
            <Text style={styles.valueBigSize}>{stats.dailyTaskCreatingAverage}</Text>
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
    ...textStyles.regular,
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
    ...textStyles.statsValue,
  },  
  valueBigSize: {
    ...textStyles.extraBig,
    marginTop: 10,
  },
})