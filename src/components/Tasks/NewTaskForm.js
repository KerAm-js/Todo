import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton from "../buttons/MyButton";
import CheckInput from "../CheckInput";
import { colors } from "../constants/colors";
import TimePicker from "../TimePicker";

const NewTaskForm = ({type, close, addTask, tasks}) => {

  const [taskName, setTaskName] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date());
  const [isTimeAdded, setIsTimeAdded] = useState(false);
  const containerPaddingBottom = useSafeAreaInsets().bottom + 20 || 50;

  let title = type === 'add' ? 'Новая задача' : 'Редактирование';
  let btnText = type === 'add' ? 'Добавить' : 'Сохранить';

  return (
    <ScrollView 
      style={{...styles.container}}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          value={taskName}
          onChangeText={text => setTaskName(text)}
          placeholder="Задача"
        />
        <TextInput 
          style={{ ...styles.input, ...styles.textArea}}
          value={description}
          onChangeText={text => setDescription(text)}
          multiline={true}
          placeholder="Описание"
        />
        <CheckInput 
          title="Установить время"
          state={isTimeAdded} 
          setState={setIsTimeAdded} 
        />
        {
          isTimeAdded 
          ? <>
              <TimePicker 
                type="start"
                time={startTime}
                setTime={setStartTime}
                minimumDate={new Date()}
              />
              <TimePicker 
                type=""
                time={finishTime}
                setTime={setFinishTime}
                minimumDate={startTime}
              />
            </>
          : null
        }
      </View>
      <MyButton 
        title={btnText}
        type="submit"
        onPress={() => {
          if (taskName) {
            addTask({
              id: tasks.length,
              title: taskName.trim(),
              description,
              startTime: isTimeAdded ? startTime : null,
              finishTime: isTimeAdded ? finishTime : null,
              isCompleted: false,
              isExpired: false, 
            });
            close();
          } else {
            Alert.alert('Пожалуйста, заполните поле "Задача"')
          }
        }}
      />
      <MyButton 
        title="Отмена"
        type="danger"
        onPress={close}
      />
      <View style={{height: containerPaddingBottom}}>
      </View>
    </ScrollView>
  )
}

export default NewTaskForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: '100%',
  },
  title: {
    lineHeight: 22,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    paddingBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.BLUE,
    paddingVertical: 5,
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
  timeBlock: {

  },
  timeBlockTitle: {

  },
  addTimeButton: {

  },
  addTimeImage: {

  }
})