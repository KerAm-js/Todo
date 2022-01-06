import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";

const HomeGreeting = ({paddingTop, username}) => {
  return (
    <View style={{...styles.container, paddingTop: paddingTop + 10,}}>
      {
        username
        ? <>
            <Text style={styles.username}>Амир,</Text>
            <Text style={styles.greeting}>добро пожаловать!</Text>
          </>
        : <Text style={styles.noUserText}>{`Планируйте свой день\nи повышайте продуктивность`}</Text>
      }
    </View>
  )
}

export default HomeGreeting;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.ACCENT,
    paddingHorizontal: 20,
  },
  username: {
    ...textStyles.big,
    color: '#fff',
  },
  greeting: {
    ...textStyles.regular,
    color: '#fff',
  },
  noUserText: {
    ...textStyles.subtitle,
    color: '#fff',
    marginTop: 5,
  }
})