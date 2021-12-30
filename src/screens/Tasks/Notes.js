import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SlideScreenHeader from "../../components/Tasks/SlideScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Note from "../../components/Tasks/Note";
import AddButton from "../../components/buttons/AddButton";
import { NotesContext } from "../../context/notes/NotesContext";


const Notes = ({navigation}) => {
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const notesContext = useContext(NotesContext);
  const notes = notesContext.state.notes;

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 35}}>
      <SlideScreenHeader 
        navigation={navigation}
        title="Заметки"
        paddingTop={deviceTopSpace}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {
          notes.map((note, index) => (
            <Note 
              key={index} 
              text={note.text} 
              updateNote={text => notesContext.updateNote(note.id, text)}
              removeNote={() => notesContext.removeNote(note.id)}
            />
          ))
        }
      </ScrollView>
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
  scroll: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 90,
  },
})