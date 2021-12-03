import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, shadowStyles } from "../../constants";

const TaskBlock = ({
  id,
  text, 
  description, 
  date, 
  isCompleted, 
  isDeadline, 
  deleteTask, 
  toggleTaskCompleting,
  setIsDeadline,
  showEditModal,
  setEditTaskId,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState();

  let interval = useRef();

  const startTimer = () => {

    interval.current = setInterval(() => {
      const currentDate = new Date();
      const distance = date - currentDate;

      let daysString;
      let hoursString;
      let minutesString;
      let secondsString;
      let timeLeftString;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('over')
      } else {
        const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutesLeft = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
        const secondsLeft = Math.floor(distance % (1000 * 60) / 1000);
        
        if (daysLeft === 0 && hoursLeft === 0 && minutesLeft < 30 && isDeadline === false) {
          setIsDeadline(true);
        }
        // console.log(`${daysLeft}:${hoursLeft}:${minutesLeft}:${secondsLeft}`);

        daysString = daysLeft >= 10 ? `${daysLeft}` : `0${daysLeft}`;
        hoursString = hoursLeft >= 10 ? `${hoursLeft}` : `0${hoursLeft}`;
        minutesString = minutesLeft >= 10 ? `${minutesLeft}` : `0${minutesLeft}`;
        secondsString = secondsLeft >= 10 ? `${secondsLeft}` : `0${secondsLeft}`;

        if (daysLeft > 0) {
          timeLeftString = `${daysString} дн`
        } else if (daysLeft === 0 && hoursLeft > 0) {
          timeLeftString = `${hoursString}:${minutesString}`;
        } else if (hoursLeft === 0 && minutesLeft > 0 ) {
          timeLeftString = `${minutesString}:${secondsString}`;
        } else if (minutesLeft === 0 && secondsLeft > 0) {
          timeLeftString = `${minutesString}:${secondsString}`;
        } 
        setTimeLeft(timeLeftString);
        console.log(timeLeftString);
      }
    }, 1000);

  }

  useEffect(() => {
    startTimer();
    return () => clearInterval(interval.current);
  })

  let circleColor = '#fff';

  if (isCompleted) {
    circleColor = colors.SUCCESS;
  } else if (isDeadline || timeLeft === 'over') {
    circleColor = colors.DANGER;
  }

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
            {
              isCompleted
              ? <Image 
                  style={{width: 20, height: 20,}}
                  source={require('../images/checked.png')}
                />
              : timeLeft === 'over' 
                ? <Image 
                    style={{width: 20, height: 20,}}
                    source={require('../images/over.png')}
                  />
                : <Text style={styles.time}>{timeLeft}</Text>
            }
          </View>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            style={styles.button}
            onPress={toggleTaskCompleting}
          >
            {
              isCompleted
              ? <Image 
                  style={styles.icon}
                  source={require('../images/checked.png')}
                />
              : <Image 
                  style={styles.icon}
                  source={require('../images/check.png')}
                />
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              setEditTaskId(id);
              showEditModal(true);
            }}
          >
            <Image 
              style={styles.icon}
              source={require('../images/edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              clearInterval(interval.current);
              deleteTask();
            }}
          >
            <Image 
              style={styles.icon}
              source={require('../images/delete.png')}
            />
          </TouchableOpacity>
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
  buttonsRow: {
    marginTop: 25,
    flexDirection: "row",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    width: 20,
    height: 20,
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
