import React, {useState} from 'react';
import {View, Text, Platform, StyleSheet, TouchableOpacity, DatePickerIOS} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from './constants/colors';

const TimePicker = ({type, time, setTime}) => {

  const [show, setShow] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);
    setShow(Platform === 'ios');
  };

  const title = type === 'start' ? 'Время старта' :  'Время финиша';

  if (Platform.OS === 'ios') {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <DateTimePicker
        value={time}
        mode="time"
        is24Hour={true}
        display="default"
        locale="en_GB"
        onChange={onChange}
        style={styles.picker}
      />
    </View>
      
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity 
          style={styles.buttonAndroid}
          onPress={() => setShow(true)}
        >
          <Text style={styles.btnText}>{time ? time.toLocaleTimeString().slice(0, 5) : 'Установить'}</Text>
        </TouchableOpacity>
        {
          show
            ? <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                locale="en_GB"
                onChange={onChange}
              />
            : null
        }
        
      </View>
    );
  }
  
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.BLUE,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  picker: {
    width: 100,
  },
  title: {
    color: '#bbb',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  buttonAndroid: {
    backgroundColor: colors.LIGHTBLUE,
    minHeight: 30,
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.BLUE,
  },
  btnText: {
    fontSize: 18,
  },
})