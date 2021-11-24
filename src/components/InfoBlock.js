import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors, shadowStyles } from "../../constants";

const InfoBlock = ({title, subtitle, value, meaning}) => {

  let circleColor = '#fff';
  switch (meaning) {
    case 'danger':
      circleColor = colors.DANGER;
  }
  return (
    <View style={{...styles.container, ...shadowStyles}}>

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
        {
          value.length > 1
            ? <Text style={styles.value}>
                {value}
              </Text>
            : <Text style={styles.valueSizeBig}>
                {value}
              </Text>
        }
      </View>

    </View>
  )
}

export default InfoBlock;

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.ACCENT,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  text: {
    flex: 1,
    justifyContent: "space-between",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
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
    fontSize: 16,
    color: '#fff',
  },
  valueSizeBig: {
    fontSize: 20,
    color: '#fff',
  }
})  