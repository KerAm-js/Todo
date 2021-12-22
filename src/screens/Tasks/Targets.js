import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ViewingHeading from "../../components/Tasks/ScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Targets = ({navigation}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 50 || 20 + 50;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <ViewingHeading 
        navigation={navigation}
        title="Цели"
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        
      </ScrollView>
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
})