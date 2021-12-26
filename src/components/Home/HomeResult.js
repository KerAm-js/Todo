import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { shadow } from "../constants/shadows";
import { colors } from "../constants/colors";


const HomeResults = ({result}) => {

  const cards = [
    {
      title: "Прогресс",
      value: result.progress,
    },
    {
      title: "Осталось",
      value: result.tasksLeft,
    },
    {
      title: "Выполнено",
      value: result.completedTasks,
    },
    {
      title: "Во время",
      value: result.completedInTime
    },
    {
      title: "Просрочено",
      value: result.expiredTasks,
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Результаты</Text>
      <ScrollView 
        style={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToEnd={false}
      > 
        {
          cards.map(({title, value}, index) => {
            
            let borderColor = colors.BLUE;
            let fontSize = 18;

            if (title === 'Прогресс') {
              if (value < 50 ) {
                borderColor = colors.DANGER;
              } else if (value >= 70) {
                borderColor = colors.SUCCESS;
              }
              fontSize = 16;
            } else if (title === 'Просрочено' && value > 0) {
              borderColor = colors.DANGER;
            } else if ((title === 'Выполнено' || title === 'Во время') && value > 0) {
              borderColor = colors.SUCCESS;
            }

            return (
              <View 
                key={index}
                style={{
                  ...styles.card, 
                  ...shadow, 
                  marginLeft: index === 0 ? 20 : 15,
                  marginRight: index === cards.length - 1 ? 20 : 0,
                }}
              >
                <View style={{...styles.circle, borderColor}}>
                  <Text style={{...styles.cardValue, fontSize}}>{title === 'Прогресс' ? `${value}%` : value}</Text>
                </View>
                <Text style={styles.cardTitle}>{title}</Text>
              </View>
            )
            
          })
        }
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
    borderRadius: 20,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    borderColor: colors.BORDER_COLOR_ANDROID,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardValue: {
  },
  cardTitle: {
    fontSize: 18,
  },
});