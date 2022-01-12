import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { textStyles } from "../../constants/textStyles";

const Heading = ({title, paddingTop}) => {
  return (
    <View style={{...styles.container, paddingTop: paddingTop <= 20 ? paddingTop + 10 : paddingTop + 5}}>
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
    ...textStyles.big,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5
  },
})