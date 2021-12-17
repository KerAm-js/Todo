import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SlideHeading from "../../components/Home/SlideHeading";
import TMtechnics from "../../components/Home/TMtechnics";

const technics = [
  {
    name: '"Временные блоки"',
    active: true,
    content: 'Определите заранее все задачи, которые хотите выполнить за день. Затем выберите время выполнения для каждой задачи, например, с 8:00 по 10:00. В это время занимайтесь выполнением задачи, ни на что не отвлекаясь.',
  },
  {
    name: '"90 на 30"',
    active: false,
    content: 'Суть такая: 90 минут вы работаете, а 30 минут - отдыхаете. Техника подойдёт, если вы занимаетесь монотонной работой. А если у вас много разных задач, можно разбить их на подзадачи и определить время для них. Например, с 8:00 до 9:30 вы выполняете одну из подзадач, а с 9:30 жо 10:00 - у вас отдых.'
  },
  {
    name: '"25 на 5"',
    active: false,
    content: 'Данную технику ещё называют "методом помидора". Суть в том, что вы работаете небольшими интервалами времени в 25 минут, а между ними 5 минут отводите на отдых, а после каждых 4 повторений вы делаете большой перерыв в 30 минут. Данная техника подойдёт, если вы умеете быстро переключаться между делами. Однако если отдых может вас надолго отвлечь, то лучше воспользоваться другой методикой.',
  },
  {
    name: '"1-3-5"',
    active: false,
    content: 'На день необходимо выделить одно большое, три средних и пять небольших задач. К небольшим можно отнести несложные или бытовые дела, которые займут у вас 20-30 минут.',
  },
]

const TimeManagement = ({navigation, title, image}) => {
  return (
    <View style={styles.container}>
      <SlideHeading 
        title={title}
        image={image}
        navigation={navigation}
      />
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.title}>{`Техники урпавления\n временем`}</Text> */}
        <TMtechnics technics={technics} />
        {
          technics.map(({active, content}, index) => {
            if (active) {
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
    paddingTop: 210,
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    paddingTop: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    lineHeight: 26,
  },
})

