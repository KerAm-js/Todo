import React, { useContext, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MyButton from "../../components/buttons/MyButton";
import Heading from "../../components/Profile/Heading";
import ProfileData from "../../components/Profile/ProfileData";
import { signout } from "../../backend/firebase";
import { ProfileContext } from "../../context/profile/ProfileContext";
import { TargetsContext } from '../../context/targets/TargetsContext';
import { TasksContext } from '../../context/tasks/TasksContext';
import { NotesContext } from '../../context/notes/NotesContext';
import ModalLayout from '../../layouts/ModalLayout';
import EditForm from "../../components/Profile/EditForm";
import Loader from "../../components/Loader";
import { shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";


const Main = ({navigation}) => {

  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const profileCntxt = useContext(ProfileContext);
  const targetsCntxt = useContext(TargetsContext);
  const tasksCntxt = useContext(TasksContext);
  const notesCntxt = useContext(NotesContext);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [answerActive, setAnswerActive] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  
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
            profileCntxt.logout();
            signout(() => navigation.navigate('SignIn'));
          },
          style: "destructive",
        }
      ]
    )
  }

  const onSaveDataHandler = () => {
    Alert.alert(
      "Сохранение данных",
      "Вы уверены, что хотите отправить данные на сервер?",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Отправить",
          onPress: () => {
            const id = profileCntxt.state.userData.id;
            const tasks = tasksCntxt.state.tasks;
            const stats = tasksCntxt.state.stats;
            const targets = targetsCntxt.state.targets;
            const notes = notesCntxt.state.notes;
            profileCntxt.sendToServer(id, notes, targets, tasks, stats);
          },
          style: "default",
        }
      ]
    )
  }

  const onUploadDataFromServer = () => {
    Alert.alert(
      "Загрузка данных",
      "При загрузке копии данных, все текущие данные (за исключением профиля) будут удалены. Загрузить данные?",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Загрузить",
          onPress: () => {
            const id = profileCntxt.state.userData.id;
            profileCntxt.uploadFromServer(
              id,
              tasksCntxt.uploadTasks,
              tasksCntxt.uploadStats,
              targetsCntxt.uploadTargets,
              notesCntxt.uploadNotes,
            );
          },
          style: "default",
        }
      ]
    )
  };

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 45}}>
      <Heading title="Профиль" paddingTop={deviceTopSpace}/>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ProfileData 
          user={profileCntxt.state.userData}
        />
        <TouchableOpacity 
          style={{...styles.textBlock, ...shadow}}
          onPress={() => setAnswerActive(!answerActive)}
        >
          <Text style={styles.title}>Для чего нужен профиль?</Text>
          {
            answerActive
              ? <>
                  <Text style={styles.description}>
                    Приложение работает оффлайн. Однако возможен случай, когда вам понадобиться где-то сохранить данные на время, например, для смены устройства. Чтобы сохранить копию данных (ваша статистика, цели и т.д.) на сервере, вам необходимо:
                  </Text>
                  <Text style={styles.description}>
                    {`1) Нажать на "сохранить копию", после чего все данные будут отправлены на сервер`}
                  </Text>
                  <Text style={styles.description}>
                    {`2) Затем на новом устройстве выполнить вход в вашу учётную запись.`}
                  </Text>
                  <Text style={styles.description}>
                    {`3) Далее нажать на "загрузить данные". Имейте ввиду, что при загрузке данных с сервера, все текующие данные (за исключением профиля) будут удалены.`}
                  </Text>
                </>
                : null
          }
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}}>
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
          <View style={{height: tabBarHeight + 10}}></View>
        </View>
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
    paddingBottom: 90,
  },
  textBlock: {
    marginBottom: 40,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  title: {
    ...textStyles.subtitle,
  },
  description: {
    marginTop: 10,
    ...textStyles.regular,
  }
})
