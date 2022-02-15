import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SlideScreenHeader from "../../components/Tasks/SlideScreenHeader";
import Note from "../../components/Tasks/Note";
import TasksScreenButtons from "../../components/buttons/TasksScreenButtons";
import { NotesContext } from "../../context/notes/NotesContext";
import { textStyles } from "../../constants/textStyles";
import { colors } from "../../constants/colors";
import { ScrollView } from "react-native-gesture-handler";


const Notes = ({navigation}) => {
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const notesContext = useContext(NotesContext);
  const notes = notesContext.state.notes;
  const deviceHeight = Dimensions.get('window').height;
  const [autoFocus, setAutoFocus] = useState(false);

  const deleteAllNotes = () => {
    Alert.alert(
      "Удаление заметок",
      "Вы уверены, что хотите удалить все заметки?",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "Cancel"
        },
        {
          text: "Удалить",
          onPress: notesContext.deleteAllNotes,
          style: "destructive"
        },
      ]
    )
  }

  const onAddNoteHandler = () => {
    notesContext.addNote();
    setAutoFocus(true);
  }

  const onRemoveNoteHandler = id => {
    setAutoFocus(false);
    notesContext.removeNote(id);
  }

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 45}}>
      <SlideScreenHeader 
        navigation={navigation}
        title="Заметки"
        paddingTop={deviceTopSpace}
      />
      <View style={styles.content}>
        {
          notes.length
          ? <FlatList 
              contentContainerStyle={{...styles.list, paddingBottom: deviceHeight / 2}}
              data={notes}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <Note 
                  key={index} 
                  text={item.text} 
                  updateNote={text => notesContext.updateNote(item.id, text)}
                  removeNote={() => onRemoveNoteHandler(item.id)}
                  autoFocus={index === 0 ? autoFocus : false}
                />
              )}
            />
          : <Text style={styles.noContentText}>
              Нет добавленных заметок
            </Text>
        }
      </View>
      <TasksScreenButtons 
        addButton={onAddNoteHandler}
        deleteButton={deleteAllNotes}
      />
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