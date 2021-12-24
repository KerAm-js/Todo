import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddTaskButton from "../../components/Tasks/AddTaskButton";
import ModalLayout from "../../layouts/ModalLayout";
import MainNavBar from "../../components/Tasks/MainNavBar";
import Task from "../../components/Tasks/Task";
import TaskForm from "../../components/Tasks/TaskForm";
import TabScreenHeader from "../../components/headers/TabScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TasksContext } from "../../context/tasks/TasksContext";


const Main = ({
  navigation,
  route
}) => {
  const logic = useContext(TasksContext);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('Все задачи');

  let showedTasks = [...logic.state.tasks];
  
  if (activeContent === 'Выполнено') {
    showedTasks = logic.state.tasks.filter(task => task.isCompleted);
  } else if (activeContent === 'Просрочено') {
    showedTasks = logic.state.tasks.filter(task => task.isExpired && !task.isCompleted);
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
                showTaskDetails={() => logic.showTaskDetails(task.id, navigation)}
                completeTask={() => logic.completeTask(task.id)}
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
            tasks={logic.state.tasks}
            addTask={logic.addTask}
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
