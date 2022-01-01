import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Heading from "../../components/Profile/Heading";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from "../../components/Input";
import MyButton from "../../components/buttons/MyButton";
import { ProfileContext } from "../../context/profile/ProfileContext";
import { signin } from "../../backend/firebase";

const SignIn = ({navigation}) => {

  const profileCntxt = useContext(ProfileContext);
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (profileCntxt.token) {
      navigation.navigate('Main');
    }
  })

  const onSignInHandler = () => {
    signin(email, password, (token) => {
      profileCntxt.login(email, token);
      navigation.navigate("Main");
    });
  }

  useEffect(() => profileCntxt.autoLogin(() => navigation.navigate("Main")), []);

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
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
            textContentType="emailAddress"
          />
          <Input 
            placeholder="Пароль" 
            value={password}
            onChangeText={text => setPassword(text)}
            textContentType="password"
          />
        </View>
        <MyButton 
          title="Вход" 
          type="submit"
          onPress={onSignInHandler}
        />
        <MyButton 
          title="Регистрация" 
          type="submit"
          onPress={() => navigation.navigate("SignUp")}
        />
      </ScrollView>
    </View>
  )
}

export default SignIn;

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