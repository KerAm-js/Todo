import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton from "../buttons/MyButton";
import Input from "../Input";
import { textStyles } from "../../constants/textStyles";

const EditForm = ({ close, userData, editProfile }) => {

  const containerPaddingBottom = useSafeAreaInsets().bottom + 20 || 50;
  const [name, setName] = useState(userData ? userData.name : '');
  const [surname, setSurname] = useState(userData ? userData.surname : '');
  const [age, setAge] = useState(userData ? userData.age : '');
  const [location, setLocation] = useState(userData ? userData.location : '');
  const [job, setJob] = useState(userData ? userData.job : '');

  const onEditHandler = () => {
    editProfile({
      ...userData,
      name, 
      surname, 
      age, 
      location, 
      job
    });
    close();
  }

  return (
    <ScrollView 
      style={{...styles.container}}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}></Text>
      <View style={styles.form}>
        <Input 
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Имя"
        />
        <Input 
          style={styles.input}
          value={surname}
          onChangeText={text => setSurname(text)}
          placeholder="Фамилия"
        />
        <Input 
          style={styles.input}
          value={age}
          onChangeText={text => setAge(text)}
          placeholder="Возраст"
        />
        <Input 
          style={styles.input}
          value={location}
          onChangeText={text => setLocation(text)}
          placeholder="Место проживания"
        />
        <Input 
          style={styles.input}
          value={job}
          onChangeText={text => setJob(text)}
          placeholder="Род деятельности"
        />
      </View>
      <MyButton 
        title="Сохранить"
        type="submit"
        onPress={onEditHandler}
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

export default EditForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
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