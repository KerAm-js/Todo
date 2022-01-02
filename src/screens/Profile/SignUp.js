import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Modal } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from "../../components/Input";
import MyButton from "../../components/buttons/MyButton";
import SlideScreenHeader from "../../components/Tasks/SlideScreenHeader";
import { ProfileContext } from "../../context/profile/ProfileContext";
import { signup } from "../../backend/firebase";
import ErrorMessage from "../../components/Error";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const SignUp = ({navigation}) => {
  
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const profileCntxt = useContext(ProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();

  const [error, setError] = useState();
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [confirmedPassInvalid, setConfirmedPassInvalid] = useState(false);

  const onSignUpHandler = () => {
    if (password === confirmedPassword) {
      signup(email, password, onSuccessSignUpHandler, onSingUpErrorHandler);
    } else {
      setError('Пароли не совпадают:Пожалуйтса, проверьти пароли и повторите попытку')
    }
  }

  const onSuccessSignUpHandler = token => {
    if (token) {
      profileCntxt.createUser(token, email);
      navigation.navigate("Main");
    } 
  }

  const onSingUpErrorHandler = error => {
    let errorMessage = `Что-то пошло не так:Пожалуйста, проверьте все поля ввода`;
    switch (error.code) {

      case 'auth/internal-error': {
        errorMessage = `Неверный пароль:Пожалуйста, проверьте все поля и повторите попытку`;
        break;
      };

      case 'auth/wrong-password': {
        errorMessage = `Неверный пароль:Пожалуйста, проверьте все поля и повторите попытку`;
        break;
      };

      case 'auth/invalid-email': {
        errorMessage = `Неверный email:Пожалуйста, повторите попытку`;
        break;
      };

      case 'auth/weak-password': {
        errorMessage = `Слишком короткий пароль:Пароль должен содержать не менее 6 символов`;
        break;
      };

      default: {
        break;
      }
    }
    console.log(error.code)
    setError(errorMessage)
  }

  const validateEmail = (email, setInvalid) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase())
    if (!email) {
      setInvalid('Заполните это поле');
    } else if (!isValid) {
      setInvalid('Неверный e-mail');
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

  const onConfirmedPasswordChangeHandler = text => {
    onInputChange(text, setConfirmedPassword, validatePassword, setConfirmedPassInvalid);
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
        {
          error 
          ? <ErrorMessage message={error} />
          : <Message message="Придумайте email и пароль для своего аккаунта"/>
        }
        <View style={styles.inputs}>
          <Input 
            style={{marginTop: 15}}
            placeholder="Логин" 
            value={email}
            onChangeText={onEmailChangeHandler}
            textContentType="emailAddress"
            invalid={emailInvalid}
          />
          <Input 
            placeholder="Пароль" 
            value={password}
            onChangeText={onPasswordChangeHanlder}
            textContentType="newPassword"
            invalid={passwordInvalid}
          />
          <Input 
            placeholder="Подтвердите пароль" 
            value={confirmedPassword}
            onChangeText={onConfirmedPasswordChangeHandler}
            textContentType="newPassword"
            invalid={confirmedPassInvalid}
          />
        </View>
        <MyButton 
          title="Зарегистрироваться" 
          type="submit"
          onPress={onSignUpHandler}
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
    paddingTop: 25,
    paddingBottom: 90,
  },
  inputs: {
    marginBottom: 20,
  }
})