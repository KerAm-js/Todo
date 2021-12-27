import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ViewingHeading from "../../components/Tasks/ScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Note from "../../components/Tasks/Note";
import AddButton from "../../components/buttons/AddButton";
import { useContext } from "react/cjs/react.development";
import { NotesContext } from "../../context/notes/NotesContext";


const Notes = ({navigation}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 50 || 20 + 50;
  const notesContext = useContext(NotesContext);
  const notes = notesContext.state.notes;

  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <ViewingHeading 
        navigation={navigation}
        title="Заметки"
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
    paddingTop: 110,
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