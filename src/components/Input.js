import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors } from '../constants/colors';
import { textStyles } from '../constants/textStyles';

const Input = props => {
  return (
    <TextInput 
      {...props}
      style={{...styles.input, ...props.style}}
    />
  )
}

export default Input;

const styles = StyleSheet.create({
  input: {
    ...textStyles.regular,
    borderBottomWidth: 1,
    borderColor: colors.BLUE,
    lineHeight: 24,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
  }
})