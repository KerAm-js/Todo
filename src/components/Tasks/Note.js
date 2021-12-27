import React from "react";
import { Image, Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const Note = ({text, updateNote, removeNote,}) => {

  const onRemoveNote = () => {
    Alert.alert(
      "Удаление заметки",
      "Вы уверены, что хотите удалить заметку?",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "Cancel"
        },
        {
          text: "Удалить",
          onPress: () => {
            removeNote();
          },
          style: "destructive"
        },
      ]
    )
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={text}
        onChangeText={text => updateNote(text)}
        multiline={true}
        autoFocus={true}
      />
      <TouchableOpacity
        onPress={onRemoveNote}
      >
        <Image 
          style={styles.image}
          source={require('../../images/bigBinSircle.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Note;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.BLUE,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,

  },
  input: {
    fontSize: 18,
    lineHeight: 18,
    marginTop: 10,
  },
  image: {
    width: 25,
    height: 25,
  }
})