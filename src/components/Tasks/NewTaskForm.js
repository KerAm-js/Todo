import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import { colors } from "../constants/colors";
import TimePicker from "../TimePicker";

const NewTaskForm = ({type}) => {

  const [taskName, setTaskName] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(startTime);

  let title = type === 'add' ? 'Новая задача' : 'Редактирование';
  let btnText = type === 'add' ? 'Добавить' : 'Сохранить';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput 
        style={styles.input}
        value={taskName}
        onChangeText={text => setTaskName(text)}
        placeholder="Название задачи"
      />
      <TimePicker 
        type="start"
        time={startTime}
        setTime={setStartTime}
      />
      <TimePicker 
        type=""
        time={finishTime}
        setTime={setFinishTime}
      />
      <TextInput 
        style={{ ...styles.input, ...styles.textArea}}
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
        placeholder="Описание задачи"
      />
      <TouchableOpacity style={{...styles.button, ...styles.addButton}}>
        <Text style={styles.btnText}>
          {btnText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.button, ...styles.closeButton}}>
        <Text style={styles.btnText}>
          Отмена
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default NewTaskForm;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.BLUE,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  textArea: {
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 10,
    minHeight: 120,
    marginVertical: 20,
  },
  button: {
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 10,
  },  
  addButton: {
    borderColor: colors.BLUE,
    backgroundColor: colors.LIGHTBLUE,
  },
  closeButton: {
    borderColor: colors.DANGER,
    backgroundColor: colors.LIGHTDANGER,
  },
  buttonText: {
    fontSize: 18,
  },
})