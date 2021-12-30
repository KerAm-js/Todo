import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react/cjs/react.development";
import SlideHeading from "../../components/Home/SlideHeading";
import TMtechnics from "../../components/Home/TMtechnics";
import { textStyles } from "../../constants/textStyles";

const technics = [
  {
    id: 0,
    name: 'Временные блоки',
    content: 'Определите заранее все задачи, которые хотите выполнить за день. Затем выберите время выполнения для каждой задачи, например, с 8:00 до 10:00. В это время занимайтесь выполнением задачи, ни на что не отвлекаясь. Данное приложение в основном спроектировано именно под эту технику. Однако это не значит, что вы не можете пользоваться другими.',
  },
  {
    id: 1,
    name: '90 на 30',
    content: 'Суть такая: 90 минут вы работаете, а 30 минут - отдыхаете. Техника подойдёт, если вы занимаетесь монотонной работой. А если у вас много разных задач, можно разбить их на подзадачи и определить время для них. Например, с 8:00 до 9:30 вы выполняете одну из подзадач, а с 9:30 до 10:00 - у вас отдых.'
  },
  {
    id: 2,
    name: '25 на 5',
    content: 'Данную технику ещё называют "методом помидора". Суть в том, что вы работаете небольшими интервалами времени по 25 минут, а между ними 5 минут отводите на отдых, а после каждых 4 повторений вы делаете большой перерыв в 30 минут. Данная техника подойдёт, если вы умеете быстро переключаться между делами. Однако если отдых может вас надолго отвлечь, то лучше воспользоваться другой методикой.',
  },
  {
    id: 3,
    name: '1-3-5',
    content: `Разбейте задачи на три группы: мелкие, средние и большие. В качестве критерия можно использовать время выполнения задачи, её сложность и т.п.\nНа день необходимо выделить одну большую, три средних и пять мелких задач. Таким образом, вы сможете сделать свой день более продуктивным, меньше уставая при этом.`,
  },
] 

const TimeManagement = ({navigation, title, image}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const deviceTopSpace = useSafeAreaInsets().top || 20;

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 170 }}>
      <SlideHeading 
        title={`Техники\nтайм-менеджмента`}
        image={image}
        navigation={navigation}
        paddingTop={deviceTopSpace}
      />
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TMtechnics 
          technics={technics} 
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
        {
          technics.map(({content, id}, index) => {
            if (id === activeSlide) {
              return (
                <Text style={styles.description} key={index}>{content}</Text>
              )
            }
          })
        }
      </ScrollView>
    </View>
  )
}

export default TimeManagement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    paddingTop: 30,
  },
  description: {
    ...textStyles.regular,
    lineHeight: 26,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
})

