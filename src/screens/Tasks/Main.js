import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddTaskButton from "../../components/Tasks/AddTaskButton";
import ModalLayout from "../../layouts/ModalLayout";
import MainNavBar from "../../components/Tasks/MainNavBar";
import Task from "../../components/Tasks/Task";
import TaskForm from "../../components/Tasks/TaskForm";
import TabScreenHeader from "../../components/headers/TabScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Main = ({
  tasks,  
  addTask, 
  completeTask, 
  showTaskDetails,
  navigation,
  route
}) => {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('Все задачи');

  let showedTasks = [...tasks];
  
  if (activeContent === 'Выполнено') {
    showedTasks = tasks.filter(task => task.isCompleted);
  } else if (activeContent === 'Просрочено') {
    showedTasks = tasks.filter(task => task.isExpired && !task.isCompleted);
  }

  const containerPaddingTop = useSafeAreaInsets().top + 55 + 131 || 20 + 55 + 131;

  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      {
        addTaskModalVisible 
        ? <View style={{...styles.backdrop}}></View>
        : null
      }
      <TabScreenHeader title="Задачи" />
      <MainNavBar 
        activeContent={activeContent} 
        setActiveContent={setActiveContent} 
        navigation={navigation}
        route={route}
      />
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {
          activeContent === 'Все задачи'
          ? <AddTaskButton showModal={() => setAddTaskModalVisible(true)}/>
          : null
        }
        {
          showedTasks.map((task, index) => {

            return (
              <Task 
                key={index}
                task={task} 
                showTaskDetails={() => showTaskDetails(task.id, navigation)}
                completeTask={() => completeTask(task.id)}
              />
            )
          }) 
        }
        <ModalLayout
          visible={addTaskModalVisible}
          close={() => setAddTaskModalVisible(false)}
          style={{paddingTop: containerPaddingTop}}
        >
          <TaskForm 
            type={"add"} 
            close={() => setAddTaskModalVisible(false)} 
            tasks={tasks}
            addTask={addTask}
          />
        </ModalLayout>
      </ScrollView>
    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingTop: 25,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  backdrop: {
    position: "absolute",
    zIndex: 200,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    height: '100%',
    width: '100%',
  }
})
