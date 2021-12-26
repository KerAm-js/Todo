import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const TabScreenHeader = ({title}) => {
  const containerPaddingTop = useSafeAreaInsets().top || 20;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
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
    paddingBottom: 5,
  },
  title: {
    color: '#fff',
    fontWeight: "600",
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 25,
    marginBottom: 5,
  },
})