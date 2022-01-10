import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FooterSpace from "../../components/FooterSpace";
import SlideHeading from "../../components/Home/SlideHeading";
import StatsNumbers from "../../components/Home/StatsNumbers";
import { shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";
import { TasksContext } from "../../context/tasks/TasksContext";

const Statistics = ({image, title, navigation}) => {
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const logic = useContext(TasksContext);

  const [howStatsWorksVisible, setHowStatsWorksVisible] = useState(false);
  const [mustHave, setMustHave] = useState(false);

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 125}}>
      <SlideHeading 
        title={`Ваша статистика`}
        image={image}
        navigation={navigation}
        paddingTop={deviceTopSpace}
      />
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <StatsNumbers 
          stats={logic.state.stats}
        />
        <View style={styles.textWrapper}>
          <TouchableOpacity 
            style={{...styles.textBlock, ...shadow}}
            onPress={() => setHowStatsWorksVisible(!howStatsWorksVisible)}
          >
            <Text style={styles.title}>Как работает статистика?</Text>
            {
              howStatsWorksVisible
                ? <>
                    <Text style={styles.description}>
                      Статистика представляет из себя расчёт 4 основных показателей, 
                      которые помогут дать общую оценку вашей дневной продуктивности:
                    </Text>
                    <Text style={styles.description}>
                      {`1) Количество выполненных задач.\nПоказывает общее количество задач, выполненных вами за всё время.`}
                    </Text>
                    <Text style={styles.description}>
                      {`2) Выполнено в срок.\nПоказывает долю задач, выполненных за назначенное время, от всех выполненных. То есть значение 0% данного показателя не означает, что вы выполнили 0 задач. Это означает, что из всех выполненных вами задач ни одно не выполнено вовремя. Если вы добавляете к задаче временной интервал, то это и будет сроком её выполнения. Иначе, программа будет считать сроком выполнения весь текущий день.`}
                    </Text>
                    <Text style={styles.description}>
                      {`3) Задач выполнено.\nПоказывает долю выполненных задач от общего их количества за всё время. Если показатель равен, например, 50%, это значит, что из всех задач, когда-либо записанных вами в приложении, вы выполнили половину.`}
                    </Text>
                    <Text style={styles.description}>
                      {`4) Средняя дневная активность. Показывает сколько задач в среднем вы планируете выполнить за день. Всегда обращайте внимание на данный показатель, так как от него зависит весомость всех остальных. Чем больше значение, тем лучше все показатели.`}
                    </Text>
                  </>
                  : null
            }
          </TouchableOpacity>
          <TouchableOpacity 
            style={{...styles.textBlock, ...shadow}}
            onPress={() => setMustHave(!mustHave)}
          >
            <Text style={styles.title}>Что важно знать?</Text>
            {
              mustHave
                ? <>
                    <Text style={styles.description}>
                      {`1) В статистике учитываются только дневные задачи. Цели в ней не учитываются, так как приложение акцентировано именно на дневную продуктивность.`}
                    </Text>
                    <Text style={styles.description}>
                      {`2) Все удалённые задачи не учитываются в статистике. Поэтому, если вы выполнили задачу, не удаляйте её из списка.`}
                    </Text>
                    <Text style={styles.description}>
                      {`3) На следующий день происходит проверка. Все выполненные задачи удаляются и засчитываются в статистике как выполненные. Остальные задачи считаются невыполненными и добавляются в план на следующий день, как новые задачи. Интервалы времени у них удаляются, так как это уже новый день и новый план. При желании, вы всегда можете отредактировать задачи.`}
                    </Text>
                  </>
                  : null
            }
          </TouchableOpacity>
        </View>
        <FooterSpace />
      </ScrollView>
    </View>
  )
}

export default Statistics;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingTop: 25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
  textWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  textBlock: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  title: {
    ...textStyles.subtitle,
  },
  description: {
    marginTop: 10,
    ...textStyles.regular,
  }
})