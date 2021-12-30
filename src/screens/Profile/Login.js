import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Heading from "../../components/Profile/Heading";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from "../../components/Input";
import MyButton from "../../components/buttons/MyButton";

const Login = ({navigation}) => {
  const deviceTopSpace = useSafeAreaInsets().top || 20;

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 35}}>
      <Heading title="Вход" paddingTop={deviceTopSpace}/>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputs}>
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
        </View>
        <MyButton 
          title="Вход" 
          type="submit"
          onPress={() => console.log('')}
        />
        <MyButton 
          title="Регистрация" 
          type="submit"
          onPress={() => navigation.navigate("Signin")}
        />
      </ScrollView>
    </View>
  )
}

export default Login;

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