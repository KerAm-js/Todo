import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from "../../components/Input";
import MyButton from "../../components/buttons/MyButton";
import SlideScreenHeader from "../../components/Tasks/SlideScreenHeader";

const Signin = ({navigation}) => {
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  
  const [name, setName] = useState();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 35}}>
      <SlideScreenHeader 
      paddingTop={deviceTopSpace}
        title="Регистрация" 
        navigation={navigation}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputs}>
          <Input 
            placeholder="Ваше имя" 
            value={name}
            onChangeText={text => setName(text)}
          />
          <Input 
            placeholder="Логин" 
            value={login}
            onChangeText={text => setLogin(text)}
          />
          <Input 
            placeholder="Пароль" 
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Input 
            placeholder="Подтвердите пароль" 
            value={confirmedPassword}
            onChangeText={text => setConfirmedPassword(text)}
          />
        </View>
        <MyButton 
          title="Зарегистрироваться" 
          type="submit"
        />
      </ScrollView>
    </View>
  )
}

export default Signin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scroll: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 90,
  },
  inputs: {
    marginBottom: 20,
  }
})