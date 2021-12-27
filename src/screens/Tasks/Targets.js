import React, { useContext, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ViewingHeading from "../../components/Tasks/ScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddTaskButton from "../../components/Tasks/AddTaskButton";
import ContentNavBar from "../../components/Tasks/ContentNavBar";

const Targets = ({navigation, route}) => {

  const [addTargetModalVisible, setAddTargetModalVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('Все цели');

  const containerPaddingTop = useSafeAreaInsets().top + 55 + 100 || 20 + 55 + 100;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <ViewingHeading 
        navigation={navigation}
        title="Цели"
      />
      <ContentNavBar 
        activeContent={activeContent}
        setActiveContent={setActiveContent}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
      </ScrollView>
      <AddTaskButton />
    </View>
  )
}

export default Targets;

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
  backdrop: {
    position: "absolute",
    zIndex: 200,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    height: '100%',
    width: '100%',
  }
})