import React, { useState, useContext } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ModalLayout from "../../layouts/ModalLayout";
import MainNavBar from "../../components/Tasks/MainNavBar";
import Task from "../../components/Tasks/Task";
import TaskForm from "../../components/Tasks/TaskForm";
import TabScreenHeader from "../../components/headers/TabScreenHeader";
import { TasksContext } from "../../context/tasks/TasksContext";
import { TargetsContext } from "../../context/targets/TargetsContext";
import Target from "../../components/Tasks/Target";
import AddButton from "../../components/buttons/AddButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { textStyles } from "../../constants/textStyles";
import { colors } from "../../constants/colors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";


const Main = ({ navigation, route }) => {

  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const tabBarHeight = useBottomTabBarHeight();

  const targetContext = useContext(TargetsContext);
  const targets = targetContext.state.targets;

  const taskContext = useContext(TasksContext);
  const tasks = taskContext.state.tasks;

  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [activeType, setActiveType] = useState("Tasks");
  const [activeContent, setActiveContent] = useState('Все задачи');

  let showedContent;
  let noContentText;
  
  if (activeType === 'Tasks') {
    if (activeContent === 'Выполнено') {
      showedContent = tasks.filter(task => task.isCompleted);
      noContentText = 'Нет выполненных задач';
    } else if (activeContent === 'Просрочено') {
      showedContent = tasks.filter(task => task.isExpired && !task.isCompleted);
      noContentText = 'Нет просроченных задач';
    } else {
      showedContent = [...tasks]
      noContentText = 'Нет добавленных задач';
    }
  } else if (activeType === 'Targets') {
    if (activeContent === 'Выполнено') {
      showedContent = targets.filter(target => target.isCompleted);
      noContentText = 'Нет выполненных целей';
    } else if (activeContent === 'Просрочено') {
      showedContent = targets.filter(target => target.isExpired && !target.isCompleted);
      noContentText = 'Нет просроченных целей';
    } else {
      showedContent = [...targets];
      noContentText = 'Нет добавленных целей';
    }
  }

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 171}}>
      {
        addTaskModalVisible 
        ? <View style={{...styles.backdrop}}></View>
        : null
      }
      <TabScreenHeader title="Работа" paddingTop={deviceTopSpace}/>
      <MainNavBar 
        activeType={activeType}
        setActiveType={setActiveType}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
        navigation={navigation}
        route={route}
        deviceTopSpace={deviceTopSpace + 25 + 10}
      />
      <View style={styles.content}>
        {
          !!showedContent.length
            ? <FlatList 
                contentContainerStyle={{...styles.list, paddingBottom: tabBarHeight}}
                showsVerticalScrollIndicator={false}
                data={showedContent}
                keyExtractor={item => item.id}
                renderItem={({item}, index) => {
                  let showDetails = () => taskContext.showTaskDetails(item.id, navigation);
                  let complete = () => taskContext.completeTask(item.id);

                  if (activeType === 'Targets') {
                    showDetails = () => targetContext.showTargetDetails(item.id, navigation);
                    complete = () => targetContext.completeTarget(item.id);
                  } 

                  return (
                    <View key={index}>
                      {
                        activeType === 'Tasks' 
                          ? <Task 
                              task={item} 
                              showDetails={showDetails}
                              complete={complete}
                            />
                          : <Target 
                              target={item} 
                              showDetails={showDetails}
                              complete={complete}
                            />
                      }
                    </View>
                  )
                }}
              >
              </FlatList>
            : <Text style={styles.noContentText}>
                {noContentText}
              </Text>
        }
      </View>
      
      
      <ModalLayout
          visible={addTaskModalVisible}
          close={() => setAddTaskModalVisible(false)}
          style={{paddingTop: deviceTopSpace + 171}}
        >
          {
            activeType === 'Tasks' 
            ? <TaskForm 
                name="task"
                type="add" 
                close={() => setAddTaskModalVisible(false)} 
                tasks={tasks}
                addTask={taskContext.addTask}
              />
            : <TaskForm 
                name="target"
                type="add" 
                close={() => setAddTaskModalVisible(false)} 
                targets={targets}
                addTarget={targetContext.addTarget}
              />
          }
        </ModalLayout>
      <AddButton onPress={() => setAddTaskModalVisible(true)}/>
    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  content: {
    borderRadius: 25,
    backgroundColor: '#fff',
    height: '100%',
  },
  backdrop: {
    position: "absolute",
    zIndex: 200,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    height: '100%',
    width: '100%',
  },
  list: {
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  noContentText: {
    ...textStyles.subtitle,
    textAlign: "center",
    marginTop: 40,
    color: colors.ACCENT
  }
})
