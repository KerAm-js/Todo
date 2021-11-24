import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoBlock from "./InfoBlock";

const stats = [
  {
    title: 'Год',
    value: '20%',
    meaning: 'danger',
  },
  {
    title: 'Месяц',
    value: '50%',
  },
  {
    title: 'День',
    value: '70%',
  }
]

const Statistics = () => {
  return (
    <View style={styles.container}>
      {
        stats.map((block, index) => (
          <InfoBlock {...block} key={index} />
        ))
      }
    </View>
  )
}

export default Statistics;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
})