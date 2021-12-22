import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Heading = ({title}) => {
  const containerPaddingTop = useSafeAreaInsets().top || 20;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Heading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: '100%',
    width: '100%',
    backgroundColor: colors.ACCENT,
    alignItems: "center"
  },
  title: {
    color: '#fff',
    fontWeight: "600",
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 25,
  },
})