import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image, TouchableWithoutFeedback, TouchableOpacityBase, Pressable, Platform } from "react-native";
import { colors } from "../../constants/colors";
import { androidShadow, shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";


const Target = ({target, complete, showDetails, style}) => {

  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ]

  const finishTime = new Date(target?.finishTime)

  let finishTimeString = 'Не указано';
  if (target?.finishTime) {
    finishTimeString = `${finishTime.getDate()} ${months[finishTime.getMonth()]} ${finishTime.getFullYear()} г.`;
  }
  let borderColor = colors.BLUE;
  let image = null;

  if (target.isCompleted) {
    image = <Image 
      source={require('../../images/success.png')} 
      style={styles.successImage}
    />;
    borderColor = colors.SUCCESS
  } else if (target.isExpired) {
    image = <Image 
      source={require('../../images/danger.png')} 
      style={styles.image}
    />;
    borderColor = colors.DANGER
  }

  let blockShadow = {
    ...shadow
  }

  if (Platform.OS === 'android') {
    blockShadow = {
      ...androidShadow,
      elevation: 5,
    }
  }

  return (
    <TouchableOpacity 
      style={{...styles.container, ...blockShadow, ...style}}
      onLongPress={showDetails}
      activeOpacity={0.5}
    >
      <View style={styles.textContent}>
        {
          target.finishTime 
            ? <>
                <Text numberOfLines={1}  style={styles.title}>{target.title}</Text>
                <Text style={styles.time}>{`${finishTimeString}`}</Text>
              </>
            : <Text numberOfLines={1}  style={styles.title}>{target.title}</Text>
        }
      </View>
      <TouchableOpacity
        style={{...styles.button, borderColor}}
        onPress={complete}
      >
        {
          image
        }
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default Target;

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    ...textStyles.regular,
  },
  textContent: {
    maxWidth: '80%',
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.BLUE,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 12,
    height: 12,
  },
  successImage: {
    width: 15,
    height: 12,
  },
  time: {
    marginTop: 5,
    ...textStyles.extraSmall
  },
})