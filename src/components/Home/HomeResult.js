import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../constants/shadows";
import { colors } from "../constants/colors";

const HomeResults = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Результаты</Text>
      <ScrollView 
        style={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToEnd={false}
      > 
        <View style={{...styles.card, ...shadow}}>
          <View style={styles.circle}>
            <Text style={styles.cardValue}>70%</Text>
          </View>
          <Text style={styles.cardTitle}>Прогресс</Text>
        </View>
        <View style={{...styles.card, ...shadow}}>
          <View style={styles.circle}>
            <Text style={styles.cardValue}>3</Text>
          </View>
          <Text style={styles.cardTitle}>Просрочено</Text>
        </View>
        <View style={{...styles.card, ...shadow}}>
          <View style={styles.circle}>
            <Text style={styles.cardValue}>5</Text>
          </View>
          <Text style={styles.cardTitle}>Выполнено</Text>
        </View>
        <View style={{...styles.card, ...shadow, marginRight: 20,}}>
          <View style={styles.circle}>
            <Text style={styles.cardValue}>2</Text>
          </View>
          <Text style={styles.cardTitle}>Осталось</Text>
        </View>
      </ScrollView>
    </View>
    
  )
}

export default HomeResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 20,
  },
  scroll: {
    paddingTop: 15,
    paddingBottom: 35,
  },
  card: {
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#fff',
    height: 140,
    width: 140,
    marginLeft: 20,
    borderRadius: 20,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    borderColor: colors.BORDER_COLOR_ANDROID,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 18,
  },
});