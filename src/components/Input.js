import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { colors } from '../constants/colors';
import { textStyles } from '../constants/textStyles';

const Input = props => {
  let inputStyle = {
    ...styles.input,
    ...props.style,
  }

  if (props.invalid) {
    inputStyle = {
      ...styles.input,
      ...props.style,
      ...styles.inputInvalidStyle
    }
  }
  return (
    <View style={styles.container}>
      <TextInput 
        {...props}
        style={inputStyle}
      />
      <Text style={styles.inputErrorMessage}>{props.invalid}</Text> 
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  input: {
    ...textStyles.regular,
    borderBottomWidth: 1,
    borderColor: colors.BLUE,
    lineHeight: 24,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  inputInvalidStyle: {
    borderColor: colors.DANGER,
  },
  inputErrorMessage: {
    ...textStyles.extraSmall,
    color: colors.DANGER,
    marginLeft: 14,
    marginTop: 10,
  }
})