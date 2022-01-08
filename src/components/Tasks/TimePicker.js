import React, {useState} from 'react';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';

const TimePicker = ({type, time, setTime, minimumDate, mode}) => {

  const [show, setShow] = useState();

  const onChange = (event, selectedDate) => {
    setTime(selectedDate);
    setShow(Platform === 'ios');
  };

  const title = type === 'start' ? 'Начало:' :  'Конец:';

  if (Platform.OS === 'ios') {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode ? "Выполнить до" : title}</Text>
      <DateTimePicker
        value={time || new Date()}
        mode={mode || "time"}
        is24Hour={true}
        display="default"
        minimumDate={minimumDate}
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
          <Text style={styles.btnText}>{time ? mode ? time.toLocaleDateString() : time.toLocaleTimeString().slice(0, 5) : 'Установить'}</Text>
        </TouchableOpacity>
        {
          show
            ? <DateTimePicker
                value={time || new Date()}
                mode={mode || "time"}
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
    marginBottom: 10,
  },
  picker: {
    minWidth: 150,
  },
  title: {
    ...textStyles.regular,
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