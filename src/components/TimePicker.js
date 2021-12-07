import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DTPicker = ({date, setDate}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
          minimumDate={currentDate}
          maximumDate={new Date().setFullYear(currentDate.getFullYear() + 1)}
          textColor="#fff"
        />
    </View>
  );
};

export default DTPicker;

const styles = StyleSheet.create({
  container: {

  },
})