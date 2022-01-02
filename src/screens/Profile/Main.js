import React, { useContext, useEffect, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, View } from "react-native";
import MyButton from "../../components/buttons/MyButton";
import Heading from "../../components/Profile/Heading";
import ProfileData from "../../components/Profile/ProfileData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signout } from "../../backend/firebase";
import { ProfileContext } from "../../context/profile/ProfileContext";
import { TargetsContext } from '../../context/targets/TargetsContext';
import { TasksContext } from '../../context/tasks/TasksContext';
import { NotesContext } from '../../context/notes/NotesContext';
import ModalLayout from '../../layouts/ModalLayout';
import EditForm from "../../components/Profile/EditForm";
import Loader from "../../components/Loader";

const Main = ({navigation}) => {

  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const profileCntxt = useContext(ProfileContext);
  const targets = useContext(TargetsContext).state.targets;
  const tasks = useContext(TasksContext).state;
  const notes = useContext(NotesContext).state.notes;
  const [editModalVisible, setEditModalVisible] = useState(false);
  
  const closeEditModal = () => {
    setEditModalVisible(false);
  }

  const openEditModal = () => {
    setEditModalVisible(true);
  }

  const onSignOut = () => {
    Alert.alert(
      "Выход из аккаунта",
      "Вы уверены, что хотите выйти из аккаунта?",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Выйти",
          onPress: () => {
            signout(() => navigation.navigate('SignIn'));
            profileCntxt.logout();
          },
          style: "destructive",
        }
      ]
    )
  }

  const onSaveDataHandler = () => {
    const id = profileCntxt.state.userData.id;
    const tasksData = {
      taskList: tasks.tasks,
      createdTasksCount: tasks.createdTasksCount,
      stats: tasks.stats,
      result: tasks.result,
    }
    profileCntxt.sendToServer(id, notes, targets, tasksData);
  }

  const onUploadDataFromServer = () => {
    const id = profileCntxt.state.userData.id;
    profileCntxt.uploadFromServer(id);
  }

  useEffect(() => profileCntxt.autoLogin(() => navigation.navigate("SignIn")), []);

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 35}}>
      <Heading title="Профиль" paddingTop={deviceTopSpace}/>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ProfileData 
          user={profileCntxt.state.userData}
        />
        <MyButton 
          type="submit"
          title="Сохранить копию"
          onPress={onSaveDataHandler}
        />
        <MyButton 
          type="submit"
          title="Загрузить данные"
          onPress={onUploadDataFromServer}
        />
        <MyButton 
          type="submit"
          title="Редактировать"
          onPress={openEditModal}
        />
        <MyButton 
          type="danger"
          title="Выйти"
          onPress={onSignOut}
        />
      </ScrollView>
      <Modal
        animationType="fade"
        visible={profileCntxt.state.isLoading} 
        transparent={true} 
      >
        <Loader />
      </Modal>
      <ModalLayout
        visible={editModalVisible}
        close={closeEditModal}
        style={{paddingTop: deviceTopSpace + 35}}
      >
        <EditForm 
          close={closeEditModal} 
          userData={profileCntxt.state.userData}
          editProfile={(userData) => profileCntxt.editProfile(userData)}
        />
      </ModalLayout>
    </View>
  )
}

export default Main;

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
    paddingTop: 30,
    paddingBottom: 90,
  },
})
