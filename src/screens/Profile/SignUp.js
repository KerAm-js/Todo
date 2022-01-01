import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from "../../components/Input";
import MyButton from "../../components/buttons/MyButton";
import SlideScreenHeader from "../../components/Tasks/SlideScreenHeader";
import { ProfileContext } from "../../context/profile/ProfileContext";
import { signup } from "../../backend/firebase";

const SignUp = ({navigation}) => {
  
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const profileCntxt = useContext(ProfileContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();

  const onSignUpHandler = () => {
    if (password === confirmedPassword) {
      signup(email, password, (token) => {
        if (token) {
          console.log(token)
          console.log(email)
          navigation.navigate("Main");
          profileCntxt.createUser(token, email);
        } 
      });
    } else {
      Alert.alert("Пароли не совпадают")
    }
  }

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
            placeholder="Логин" 
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
            textContentType="emailAddress"
          />
          <Input 
            placeholder="Пароль" 
            value={password}
            onChangeText={text => setPassword(text)}
            textContentType="newPassword"
          />
          <Input 
            placeholder="Подтвердите пароль" 
            value={confirmedPassword}
            onChangeText={text => setConfirmedPassword(text)}
            textContentType="newPassword"
          />
        </View>
        <MyButton 
          title="Зарегистрироваться" 
          type="submit"
          onPress={onSignUpHandler}
        />
      </ScrollView>
    </View>
  )
}

export default SignUp;

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