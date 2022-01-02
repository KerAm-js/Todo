import React, { useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from "./ProfileContext";
import { profileReducer } from "./profileReducer";
import { CREATE_USER, LOG_IN, LOG_OUT, EDIT_USER_DATA } from "./types";

const ProfileState = ({children}) => {
  const initialState = {
    userData: {
      email: "",
      name: "",
      surname: "",
      age: "",
      place: "",
      job: "",
    },
    token: null,
  }
  
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const editProfile = async (userData) => {
    try {
      const response = await fetch(`https://productive-plus-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.id}/userData.json`, {
        method: "PATCH",
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
          ...userData,
        })
      })
      const data = await response.json();
      console.log(data);
      dispatch({type: EDIT_USER_DATA, userData,})
    } catch (e) {
      console.log(e);
    }
  }

  const createUser = async (token, email) => {
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
        AsyncStorage.multiSet([['token', token], ['email', email]]);
        dispatch({type: CREATE_USER, id: data.name, token, email,});
        editProfile({
          id: data.name,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const login = async (email, token) => {
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
        AsyncStorage.multiSet([['token', token], ['email', email]]);
        dispatch({type: LOG_IN, token, userData})
      }
    } catch (e) {
      console.log(e);
    }
  }

  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'email']);
    dispatch({type: LOG_OUT});
  }

  const autoLogin = async (navigate) => {
    try {
      const [tokenArr, emailArr] = await AsyncStorage.multiGet(['token', 'email']);
      await login(emailArr[1], tokenArr[1]);
      navigate();
    } catch (e) {
      console.log(e)
    }
  }

  const sendToServer = async (id, notes, targets, tasksData) => {
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
    } catch (e) {
      console.log(e);
    }
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
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileState;