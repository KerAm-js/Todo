import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ViewingHeading from "../../components/Tasks/ScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Notes = ({navigation}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 50 || 20 + 50;
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
        
      </ScrollView>
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