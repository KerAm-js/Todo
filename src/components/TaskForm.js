import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../constants";
import DTPicker from "../TimePicker";

const TaskForm = ({task, type, closeModal, addTask, editTask}) => {

  const [text, setText] = type === 'add' 
    ? useState('') 
    : useState(task.text);
  const [description, setDescription] = type === 'add' 
    ? useState('')
    : useState(task.description);
  const [date, setDate] = type === 'add' 
    ? useState(new Date()) 
    : useState(task.date);
  const [disabled, setDisabled] = useState(true);

  const title = type === 'add' 
    ? <Text style={styles.title}>Новая задача</Text> 
    : <Text style={styles.title}>Редактировать</Text>;

  const setDefaults = () => {
    setText('');
    setDescription('');
  }

  const onAdd = () => {
    addTask(text, date, description);
    closeModal();
    setDefaults();
  }

  const onEdit = () => {
    editTask(text, date, description);
    closeModal();
    setDefaults();
  }

  useEffect(() => {
    if (text.trim() && date) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  })

  const button = (
    <> 
      {
        type === 'add'
          ? <Button 
              color={colors.BLUE} 
              title="Добавить"
              onPress={onAdd}
              disabled={disabled}
            />
          : <Button 
              color={colors.BLUE} 
              title="Редактировать"
              onPress={onEdit}
              disabled={disabled}
            />
      }
    </>
  )

  return (
    <View style={styles.container}>
      {title}
      <TextInput 
        style={styles.input}
        value={text}
        onChangeText={text => setText(text)}
        placeholder="Название задачи"
      />
      <TextInput 
        style={{...styles.input, ...styles.textArea}}
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
        placeholder="Описание задачи"
      />
      <DTPicker 
        date={date}
        setDate={setDate}
      />
      <View style={styles.buttons}>
        {button}
        <Button 
          color={colors.DANGER} 
          title="Закрыть"
          onPress={closeModal}
        />
      </View>
    </View>
  )
}

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: colors.ACCENT,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.LIGHTBLUE,
    borderRadius: 15,
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 20,
    lineHeight: 27,
  },
  textArea: {
    height: 120,
  },
  buttons: {
  },
})