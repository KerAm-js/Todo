import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, shadowStyles } from "../../constants";

const TaskBlock = ({text, description, time, isCompleted, meaning}) => {

  let circleColor = '#fff';
  switch (meaning) {
    case 'danger':
      circleColor = colors.DANGER;
  }

  const [isOpen, setIsOpen] = useState(false);

  let containerHeight = {
    height: isOpen ? 'auto' : 90,
  };

  return (
    <View style={{...shadowStyles}}>
      <TouchableOpacity 
        style={{...styles.container, ...containerHeight}}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.headingRow}>
          <Text style={styles.text}>{text}</Text>
          <View style={{...styles.circle, borderColor: circleColor}}>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.icons}>
          
          <Image 
            style={styles.icon}
            source={require('../images/checked.png')}
          />
          <Image 
            style={styles.icon}
            source={require('../images/edit.png')}
          />
          <Image 
            style={styles.icon}
            source={require('../images/delete.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
    
  )
}

export default TaskBlock;

const styles = StyleSheet.create({
  container: {
    minHeight: 90,
    backgroundColor: colors.ACCENT,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 20,
    overflow: "hidden",
  },
  headingRow: {
    minHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  descriptionRow: {
    paddingRight: 90,
  },
  description: {
    color: '#fff',
    fontSize: 18,
  },
  icons:{
    marginTop: 15,
    flexDirection: "row",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  circle: {
    alignSelf: "flex-start",
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  time: { 
    color: '#fff',
    fontSize: 16,
  },
});
