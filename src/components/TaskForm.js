import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants";

const TaskForm = ({type, closeModal, addTask}) => {

  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const title = type === 'add' 
    ? <Text style={styles.title}>Новая задача</Text> 
    : <Text style={styles.title}>Редактировать</Text>;

  const setDefaults = () => {
    setText('');
    setTime('');
    setDescription('');
  }

  const onAdd = () => {
    const result = addTask(text, time, description);
    if (result) {
      closeModal();
      setDefaults();
    }
  }
  
  const button = (
    <> 
      {
        type === 'add'
          ? <Button 
              color={colors.BLUE} 
              title="Добавить"
              onPress={onAdd}
            />
          : <Button 
              color={colors.BLUE} 
              title="Редактировать"
              onPress={() => console.log('task edited')}
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
        style={styles.input}
        value={time}
        onChangeText={text => setTime(text)}
        placeholder="Срок выполнения"
      />
      <TextInput 
        style={{...styles.input, ...styles.textArea}}
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
        placeholder="Описание задачи"
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