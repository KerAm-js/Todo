import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Platform } from "react-native";
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

  const [titleInvalid, setTitleInvalid] = useState();

  const containerPaddingBottom = useSafeAreaInsets().bottom + 20 || 50;

  let titleInputPlaceholder = name === "task" ? "Задача" : "Цель";

  const onAddHandler = () => {
    if (!title?.trim()) {
      setTitleInvalid('Заполните это поле');
      return
    }
    if (!titleInvalid && name === 'task') {
      addTask({
        title: title.trim(),
        description,
        startTime: isTimeAdded ? startTime.toString() : null,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: 0,
        isCompletedInTime: 0,
        isExpired: isTimeAdded ? new Date() < new Date(finishTime) ? 0 : 1 : 0,
      });
      close();
    } else if(!titleInvalid && name === 'target') {
      addTarget({
        id: `${targets?.length}_${new Date().toString()}`,
        title: title.trim(),
        description,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: 0,
        isExpired: 0,
      });
      close();
    }
  }

  const onEditHandler = () => {
    if (!title?.trim() && !titleInvalid) {
      setTitleInvalid('Заполните это поле');
    }
    if (!titleInvalid && name === 'task') {
      editTask({
        title: title.trim(),
        description,
        startTime: isTimeAdded ? startTime.toString() : null,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: 0,
        isCompletedInTime: 0,
        isExpired: isTimeAdded ? (new Date() < finishTime ? 0 : 1) : 0, 
      })
      close();
    } else if (!titleInvalid && name === 'target') {
      editTarget({
        title: title.trim(),
        description,
        finishTime: isTimeAdded ? finishTime.toString() : null,
        isCompleted: 0,
        isExpired: 0,
      });
      close();
    }
  }

  const onTitleChangeHandler = text => {
    setTitle(text);
    if (!text?.trim()) {
      setTitleInvalid('Заполните это поле');
    } else {
      setTitleInvalid(null);
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

  let descriptionInputMinHeight = Platform.OS === 'ios' 
    ? {
        minHeight: 120,
      }
    : {};
    
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
          onChangeText={onTitleChangeHandler}
          placeholder={titleInputPlaceholder}
          invalid={titleInvalid}
          validation={true}
        />
        <Input 
          style={{ ...styles.input, ...styles.textArea, ...descriptionInputMinHeight}}
          value={description}
          onChangeText={text => setDescription(text)}
          onBlur={() => !description?.trim() ? setDescription('') : null}
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
        disabled={titleInvalid}
      />
      <MyButton 
        title="Отмена"
        type="danger"
        onPress={close}
      />
      <View style={{height: containerPaddingBottom + 20}}>
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
    marginBottom: Platform.OS === 'android' ? 0 : 5,
  },
  textArea: {
    alignItems: "center",
    borderWidth: Platform.OS === 'android' ? 0 : 1,
    borderBottomWidth: 1,
    borderRadius: Platform.OS === 'android' ? 0 : 20,
    paddingTop: Platform.OS === 'android' ? 0 : 15,
    marginBottom: 20,
  },
})