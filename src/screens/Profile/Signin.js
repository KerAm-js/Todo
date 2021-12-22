import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Signin = () => {
  return (
    <View style={styles.container}>
      <Heading title="Профиль" />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        
      </ScrollView>
    </View>
  )
}

export default Signin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 100,
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
