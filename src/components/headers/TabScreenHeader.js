import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';

const TabScreenHeader = ({title, paddingTop}) => {

  return (
    <View style={{...styles.container, paddingTop: paddingTop <= 20 ? paddingTop + 10 : paddingTop + 5}}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default TabScreenHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 100,
    backgroundColor: colors.ACCENT,
    paddingBottom: 10,
  },
  title: {
    ...textStyles.big,
    textAlign: 'center',
    color: '#fff',
  },
})