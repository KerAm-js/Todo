import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { androidShadow, shadow } from "../../constants/shadows";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";


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

            let cardShadow = {
              ...shadow
            }

            if (Platform.OS === 'android') {
              cardShadow = {
                ...androidShadow,
                elevation: 6,
              }
            }

            return (
              <View 
                key={index}
                style={{
                  ...styles.card, 
                  ...cardShadow, 
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
    ...textStyles.title,
    marginBottom: 5,
    marginLeft: 20,
  },
  scroll: {
  },
  card: {
    marginTop: 15,
    marginBottom: 35,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 20,
    backgroundColor: "#fff",
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
    ...textStyles.regular,
  },
  cardTitle: {
    ...textStyles.regular,
  },
});