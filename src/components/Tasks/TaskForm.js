import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton from "../buttons/MyButton";
import CheckInput from "./CheckInput";
import TimePicker from "./TimePicker";
import Input from "../Input";
import { textStyles } from "../../constants/textStyles";

const TaskForm = ({
  type, 
  name, 
  close, 
  addTask, 
  tasks,
  editTask, 
  task,
  addTarget,
  targets,
  editTarget,
  target,
}) => {
  
  const [title, setTitle] = useState(
    type === 'add' 
    ? null 
    : name === 'task' 
      ? task?.title 
      : target?.title
  );

  const [description, setDescription] = useState(
    type === 'add' 
    ? null 
    : name === 'task' 
      ? task?.description 
      : target?.description);

  const [startTime, setStartTime] = useState(task?.startTime ? new Date(task?.startTime) : new Date());

  const [finishTime, setFinishTime] = useState(
    name === 'task' 
      ? task?.finishTime 
        ? new Date(task?.finishTime)
        : startTime
      : target?.finishTime 
        ? new Date(target?.finishTime)
        : startTime 
  );

  const [isTimeAdded, setIsTimeAdded] = useState(
    type === 'add' 
    ? false 
    : name === 'task' 
      ? task?.startTime && task?.finishTime 
      : target?.finishTime
  );

  const containerPaddingBottom = useSafeAreaInsets().bottom + 20 || 50;

  let titleInputPlaceholder = name === "task" ? "Задача" : "Цель";

  const onAddHandler = () => {
    if (title?.trim() && name === 'task') {
      addTask({
        id: `${tasks?.length}_${new Date().toString()}`,
        title: title.trim(),
        description,
        startTime: isTimeAdded ? startTime.toString() : null,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: false,
        isExpired: isTimeAdded ? (new Date() < finishTime ? false : true) : false,
        isDayExpired: false, 
      });
      close();
    } else if(title?.trim() && name === 'target') {
      addTarget({
        id: `${targets?.length}_${new Date().toString()}`,
        title: title.trim(),
        description,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: false,
        isExpired: false,
      });
      close();
    } else {
      Alert.alert('Пожалуйста, заполните поле "Задача"')
    }
  }

  const onEditHandler = () => {
    if (title?.trim() && name === 'task') {
      editTask({
        title: title.trim(),
        description,
        startTime: isTimeAdded ? startTime.toString() : null,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: false,
        isExpired: isTimeAdded ? (new Date() < finishTime ? false : true) : false, 
        isDayExpired: task.isDayExpired,
      })
      close();
    } else if (title?.trim() && name === 'target') {
      editTarget({
        title: title.trim(),
        description,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: false,
        isExpired: false,
      });
      close();
    } else {
      Alert.alert(`Пожалуйста, заполните поле "${titleInputPlaceholder}"`)
    }
  }

  const onEditStartTimeHandler = time => {
    setStartTime(time);
    time > finishTime ? setFinishTime(time) : null;
  }

  let btnText = type === 'add' ? 'Добавить' : 'Сохранить';
  let formTitle = type === 'add' ? 'Новая задача' : 'Редактирование';
  if (name === 'target' && type === 'add') {
    formTitle = 'Новая цель';
  }

  return (
    <ScrollView 
      style={{...styles.container}}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{formTitle}</Text>
      <View style={styles.form}>
        <Input 
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder={titleInputPlaceholder}
        />
        <Input 
          style={{ ...styles.input, ...styles.textArea}}
          value={description}
          onChangeText={text => setDescription(text)}
          multiline={true}
          placeholder="Описание"
        />
        <CheckInput 
          title={name === "task" ? "Установить время" : "Установить дату"}
          state={isTimeAdded} 
          setState={setIsTimeAdded} 
        />
        {
          isTimeAdded 
            ? name === 'task' 
                ? <>
                    <TimePicker 
                      type="start"
                      time={startTime}
                      setTime={onEditStartTimeHandler}
                      minimumDate={type === 'add' ? new Date() : null}
                    />
                    <TimePicker 
                      type="finish"
                      time={finishTime}
                      setTime={setFinishTime}
                      minimumDate={startTime}
                    />
                  </>
                : <>
                    <TimePicker 
                      type="finish"
                      time={finishTime}
                      setTime={setFinishTime}
                      minimumDate={new Date()}
                      mode={"date"}
                    />
                  </>
            : null
        }
      </View>
      <MyButton 
        title={btnText}
        type="submit"
        onPress={type === 'add' ? onAddHandler : onEditHandler}
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

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: '100%',
  },
  title: {
    ...textStyles.title,
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    paddingBottom: 30,
  },
  input: {
  },
  textArea: {
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 10,
    minHeight: 120,
    marginBottom: 20,
  },
})