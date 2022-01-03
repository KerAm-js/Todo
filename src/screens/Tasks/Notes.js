import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, FlatList } from "react-native";
import SlideScreenHeader from "../../components/Tasks/SlideScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Note from "../../components/Tasks/Note";
import AddButton from "../../components/buttons/AddButton";
import { NotesContext } from "../../context/notes/NotesContext";
import { textStyles } from "../../constants/textStyles";
import { colors } from "../../constants/colors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";


const Notes = ({navigation}) => {
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const tabBarHeight = useBottomTabBarHeight();

  const notesContext = useContext(NotesContext);
  const notes = notesContext.state.notes;

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 35}}>
      <SlideScreenHeader 
        navigation={navigation}
        title="Заметки"
        paddingTop={deviceTopSpace}
      />
      <View style={styles.content}>
        {
          notes.length
          ? <FlatList 
              contentContainerStyle={{...styles.list, paddingBottom: tabBarHeight}}
              data={notes}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}, index) => (
                <Note 
                  key={index} 
                  text={item.text} 
                  updateNote={text => notesContext.updateNote(item.id, text)}
                  removeNote={() => notesContext.removeNote(item.id)}
                />
              )}
            />
          : <Text style={styles.noContentText}>
              Нет добавленных заметок
            </Text>
        }
      </View>
      <AddButton onPress={notesContext.addNote}/>
    </View>
  )
}

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '100%',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  noContentText: {
    ...textStyles.subtitle,
    textAlign: "center",
    marginTop: 40,
    color: colors.ACCENT
  }
})