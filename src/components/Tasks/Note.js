import React, { useRef, useEffect, useState } from "react";
import { Image, Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";

const Note = ({text, updateNote, removeNote, autoFocus, ref}) => {
  
  const [noteText, setNoteText] = useState(text);

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

  const onBlurHanlder = () => {
    if (noteText === '') {
      removeNote();
    } else {
      updateNote(noteText);
    }
  }

  // useEffect(() => {
  //   inputElement.current.focus();
  // }, [])

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={noteText}
        autoFocus={autoFocus}
        onChangeText={text => setNoteText(text)}
        multiline={true}
        onBlur={onBlurHanlder}
        placeholder="Введите текст"
      />
      <TouchableOpacity
        onPress={onRemoveNote}
        style={styles.button}
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
    ...textStyles.regular,
    width: '85%',
    lineHeight: 24,
  },
  button: {
  },
  image: {
    width: 25,
    height: 25,
  }
})