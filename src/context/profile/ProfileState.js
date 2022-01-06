import React, { useReducer } from "react";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { ProfileContext } from "./ProfileContext";
import { profileReducer } from "./profileReducer";
import { CREATE_USER, LOG_IN, LOG_OUT, EDIT_USER_DATA, SHOW_LOADER, HIDE_LOADER } from "./types";
import { Alert } from "react-native";

const ProfileState = ({children}) => {
  const initialState = {
    userData: {
      email: "",
      name: "",
      surname: "",
      age: "",
      location: "",
      job: "",
    },
    token: null,
    isLoading: false,
  }
  
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const showLoader = () => dispatch({type: SHOW_LOADER});
  const hideLoader = () => dispatch({type: HIDE_LOADER});

  const editProfile = async (userData) => {
    showLoader();
    try {
      const response = await fetch(`https://productive-plus-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.id}/userData.json`, {
        method: "PATCH",
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
          ...userData,
        })
      })
      const data = await response.json();
      dispatch({type: EDIT_USER_DATA, userData,})
    } catch (e) {
      console.log(e);
      Alert.alert("Что-то пошло не так");
    }
    hideLoader();
  }

  const createUser = async (token, email) => {
    showLoader();
    try {
      const response = await fetch('https://productive-plus-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
        method: "POST",
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
          userData: {
            ...initialState.userData,
            email,
          },
        })
      })
      const data = await response.json();
      if (token) {
        await AsyncStorageLib.multiSet([['token', token], ['email', email]]);
        dispatch({type: CREATE_USER, id: data.name, token, email,});
        editProfile({
          id: data.name,
        });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Что-то пошло не так");
    }
    hideLoader();
  }

  const login = async (email, token) => {
    showLoader();
    try {
      //users getting
      const response = await fetch('https://productive-plus-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
        method: 'GET',  
        headers: {'Content-type':'application/json'},
      });
      const data = await response.json();
      const userKeys = Object.keys(data);
      const userId = userKeys.find(id => data[id].userData.email === email);
      
      //logged user's profile data getting
      const res = await fetch(`https://productive-plus-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/userData.json`, {
        method: 'GET',  
        headers: {'Content-type':'application/json'},
      });
      const userData = await res.json();
      if (token) {
        await AsyncStorageLib.multiSet([['token', token], ['email', email]]);
        dispatch({type: LOG_IN, token, userData})
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Что-то пошло не так");
    }
    hideLoader();
  }

  const logout = async () => {
    showLoader();
    try {
      await AsyncStorageLib.multiRemove(['token', 'email']);
      dispatch({type: LOG_OUT});
    } catch (e) {
      console.log(e);
      Alert.alert("Что-то пошло не так");
    }
    hideLoader();
  }

  const autoLogin = async (onAuthErrorHanlder) => {
    showLoader();
    try {
      const [tokenArr, emailArr] = await AsyncStorageLib.multiGet(['token', 'email']);
      if (emailArr[1] && tokenArr[1]) {
        await login(emailArr[1], tokenArr[1]);
      } 
    } catch (e) {
      console.log(e);
      onAuthErrorHanlder();
    }
    hideLoader();
  }

  const sendToServer = async (id, notes, targets, tasksData) => {
    showLoader();
    try {
      const response = await fetch(`https://productive-plus-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`, {
        method: "PATCH",
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
          notes,
          targets,
          tasksData,
        })
      })
      const result = await response.json();
      console.log(result);
      Alert.alert("Данные успешно сохранены");
    } catch (e) {
      console.log(e);
      Alert.alert("Что-то пошло не так");
    }
    hideLoader();
  }

  const uploadFromServer = async (id, uploadTasks, uploadTargets, uploadNotes) => {
    showLoader();
    try {
      const response = await fetch(`https://productive-plus-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`, {
        method: "GET",
        headers: {'Content-type':'application/json'},
      })
      const data = await response.json();
      uploadTasks(data.tasksData);
      uploadTargets(data.targets);
      uploadNotes(data.notes);
      Alert.alert("Ваша последняя копия успешно загружена");
    } catch (e) {
      console.log(e);
      Alert.alert("Что-то пошло не так");
    }
    hideLoader();
  }

  return (
    <ProfileContext.Provider value={{
      state,
      editProfile,
      logout,
      createUser,
      login,
      autoLogin,
      sendToServer,
      uploadFromServer,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileState;