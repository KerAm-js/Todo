import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from '../../color';

const HomeInfo = ({title, subtitle, value, meaning}) => {

  let circleColor = '#fff';
  switch (meaning) {
    case 'danger':
      circleColor = colors.DANGER;
  }
  return (
    <View style={styles.container}>

      <View style={styles.text}>
        <Text style={styles.title}>
          {title}
        </Text>
        {
          subtitle 
          ? <Text style={styles.subtitle}>{subtitle}</Text>
          : null
        }
      </View>

      <View style={{...styles.circle, borderColor: circleColor}}>
        <Text style={styles.value}>
          {value}
        </Text>
      </View>

    </View>
  )
}

export default HomeInfo;

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#49567B',
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: .5, 
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  text: {
    flex: 1,
    justifyContent: "space-between",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
  },
  value: {
    fontSize: 20,
    color: '#fff',
  },  
})  