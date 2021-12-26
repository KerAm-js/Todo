import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SlideHeading from "../../components/Home/SlideHeading";
import StatsNumbers from "../../components/Home/StatsNumbers";
import { TasksContext } from "../../context/tasks/TasksContext";

const Statistics = ({image, title, navigation}) => {
  const contentPaddingTop = useSafeAreaInsets().top + 150;
  const logic = useContext(TasksContext);
  return (
    <View style={{...styles.container, paddingTop: contentPaddingTop}}>
      <SlideHeading 
        title={`Ваша статистика`}
        image={image}
        navigation={navigation}
      />
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <StatsNumbers 
          stats={logic.state.stats}
        />
      </ScrollView>
    </View>
  )
}

export default Statistics;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingTop: 25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
})