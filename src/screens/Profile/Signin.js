import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Modal } from "react-native";
import Heading from "../../components/Profile/Heading";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from "../../components/Input";
import MyButton from "../../components/buttons/MyButton";
import { ProfileContext } from "../../context/profile/ProfileContext";
import { signin } from "../../backend/firebase";
import ErrorMessage from "../../components/Error";
import Message from "../../components/Message";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";
import ModalLayout from '../../layouts/ModalLayout';
import Loader from "../../components/Loader";

const SignIn = ({navigation}) => {

  const profileCntxt = useContext(ProfileContext);
  const deviceTopSpace = useSafeAreaInsets().top || 20;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const onSignInHandler = async () => {
    profileCntxt.showLoader();
    signin(email, password, onSuccessAuthHanlder, onAuthErrorHanlder);
  }

  const onSuccessAuthHanlder = token => {
    profileCntxt.login(email, token);
    setEmail('');
    setPassword('');
    setError('');
    profileCntxt.hideLoader();
    navigation.navigate("Main");
  }

  const onAuthErrorHanlder = error => {
    let errorMessage = `Что-то пошло не так:Пожалуйста, проверьте все поля ввода`;
    switch (error.code) {

      case 'auth/user-not-found': {
        errorMessage = `Пользователь не найден:Пожалуйста, проверьте email и повторите попытку`;
        break;
      };

      case 'auth/wrong-password': {
        errorMessage = `Неверный пароль:Пожалуйста, проверьте пароль и повторите попытку`;
        break;
      };

      case 'auth/invalid-email': {
        errorMessage = `Неверный email:Пожалуйста, повторите попытку`;
        break;
      }

      default: {
        break;
      }
    }
    profileCntxt.hideLoader();
    setError(errorMessage);
  }

  const validateEmail = (email, setInvalid) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase())
    if (!email) {
      setInvalid('Заполните это поле');
    } else if (!isValid) {
      setInvalid('e-mail должен содержать "@" и "."');
    } else {
      setInvalid(null)
    }
  }

  const validatePassword = (password, setInvalid) => {
    if (!password) {
      setInvalid('Заполните это поле');
    } else if (password.length < 6) {
      setInvalid('Пароль должен содержать не менее 6 символов');
    } else {
      setInvalid(null);
    }
  } 

  const onInputChange = (text, setText, validation, setInvalid) => {
    setError('');
    setText(text.toLowerCase());
    validation(text, setInvalid);
  }

  const onEmailChangeHandler = text => {
    onInputChange(text, setEmail, validateEmail, setEmailInvalid);
  }

  const onPasswordChangeHanlder = text => {
    onInputChange(text, setPassword, validatePassword, setPasswordInvalid);
  }

  const onMoveToSignUpScreen = () => {
    setError(null);
    setPasswordInvalid(null);
    setEmailInvalid(null);
    navigation.navigate("SignUp");
  }

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 45}}>
      <Heading title="Вход" paddingTop={deviceTopSpace}/>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {
          error 
          ? <ErrorMessage message={error} />
          : <Message message="Войдите в аккаунт, чтобы отправить статистику и задачи на сервер"/>
        }
        <View style={styles.inputs}>
          <Input 
            style={{marginTop: 15}}
            placeholder="Логин" 
            value={email}
            onChangeText={onEmailChangeHandler}
            textContentType="emailAddress"
            invalid={emailInvalid}
            validation={true}
          />
          <Input 
            style={passwordInvalid ? styles.inputInvalidStyle : null}
            placeholder="Пароль" 
            value={password}
            onChangeText={onPasswordChangeHanlder}
            textContentType="password"
            invalid={passwordInvalid}
            validation={true}
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
          onPress={onMoveToSignUpScreen}
        />
      </ScrollView>
      <Modal 
        animationType="fade"
        visible={profileCntxt.state.isLoading} 
        transparent={true} 
      >
        <Loader />
      </Modal>
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
    paddingTop: 25,
    paddingBottom: 90,
  },
  inputs: {
    marginBottom: 20,
  },
  inputInvalidStyle: {
    borderColor: colors.DANGER,
  },
  inputErrorMessage: {
    ...textStyles.extraSmall,
    color: colors.DANGER,
    marginLeft: 20,
  }
})