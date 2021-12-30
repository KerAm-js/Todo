import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyButton from "../components/buttons/MyButton";
import SlideScreenHeader from "../components/Tasks/SlideScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ModalLayout from "../layouts/ModalLayout";
import TaskForm from "../components/Tasks/TaskForm";
import TargetData from "../components/Tasks/TargetData";
import { TargetsContext } from "../context/targets/TargetsContext";

const TargetViewing = ({navigation}) => {

  const diviceTopSpace = useSafeAreaInsets().top || 20;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const targetContext = useContext(TargetsContext);
  
  const closeModal = () => setEditModalVisible(false);
  const taskRemoving = () => {
    Alert.alert(
      "Удаление задачи",
      "Вы уверены, что хотите удалить задачу?",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "Cancel"
        },
        {
          text: "Удалить",
          onPress: () => {
            navigation.goBack();
            targetContext.removeTarget(targetContext.state.viewedTarget.id);
          },
          style: "destructive"
        },
      ]
    )
  }

  return (
    <View style={{...styles.container, paddingTop: diviceTopSpace + 35}}>
      {
        editModalVisible 
        ? <View style={{...styles.backdrop}}></View>
        : null
      }
      <SlideScreenHeader 
        navigation={navigation}
        title="Просмотр"
        paddingTop={diviceTopSpace}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TargetData 
          target={targetContext.state.viewedTarget}
          complete={() => targetContext.completeTarget(targetContext.state.viewedTarget.id)}
        />
        <MyButton 
          type="submit"
          title="Редактировать"
          onPress={() => setEditModalVisible(true)}
        />
        <MyButton 
          type="danger"
          title="Удалить"
          onPress={taskRemoving}
        />
        <ModalLayout
          visible={editModalVisible}
          close={closeModal}
          style={{paddingTop: diviceTopSpace + 35}}
        >
          <TaskForm 
            name="target"
            type="edit"
            target={targetContext.state.viewedTarget}
            close={closeModal}
            editTarget={targetData => targetContext.editTarget(targetContext.state.viewedTarget.id, targetData)}
            navigation={navigation}
          />
        </ModalLayout>
      </ScrollView>
    </View>
  )
}

export default TargetViewing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 90,
  },
  image: {
    width: 16,
    height: 16,
  },
  successImage: {
    width: 20,
    height: 16,
  },
  backdrop: {
    position: "absolute",
    zIndex: 200,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    height: '100%',
    width: '100%',
  }
});