import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FooterSpace from "../../components/FooterSpace";
import ProductivitySlider from "../../components/Home/ProductivitySlider";
import SlideHeading from '../../components/Home/SlideHeading';
import { textStyles } from "../../constants/textStyles";


const slides = [
  {
    id: 0,
    content: 'Если задача займёт у вас меньше 10 минут, выполняйте её в первую очередь. Лучше побыстрее выполнить мелкие задачи и сфокусироваться на более сложных задачах. Более того, большое количество дел может создавать иллюзию большого объёма работы, а это, в свою очередь, вызывает демотивацию.'
  },
  {
    id: 1,
    content: 'После мелких задач, выполнять стоит самые сложные, так как к концу дня вы можете устать. Также из-за выполненных мелких и средних задач вам может показаться, что день был продуктивным. Таким образом, вы, скорее всего, отложите сложную задачу на следующий день, и она ещё долго будет висеть в списке ваших задач.'
  },
  {
    id: 2,
    content: 'Если вы чувствуете, что вам лень приступать к работе, можно попробовать обмануть свой мозг: скажите себе, что поработаете всего 10-15 минут. Высока вероятность, что вы вовлечётесь в работу и чувство лени исчезнет.'
  },
  {
    id: 3,
    content: 'Если у вас много однообразных, монотонных и "скучных" задач, и если подобная работа вас утомляет, попробуйте чередовать их. Например, вы можете поработать над одной задачей 30-40 минут (это оптимальное время для сфокусированной работы над одной задачей), а потом сразу приступить к другой. Данное приложение идеально подходит для этого, так как к каждой задаче вы можете прикрепить временной интервал.'
  },
  {
    id: 4,
    content: 'Обращайте внимание на "результаты". Приложение проводит анализ ваших ежедневных задач и показывает результаты их выполнения в домашнем разделе. Сделайте выводы: какие задачи вы успели выполнить, а какие нет, что могло помешать вам, удовлетворены ли вы результатом? Также обращайте внимание на особенности невыполненных задач: возможно вам помешала сложность задачи, объём работы или вам просто неинтересно заниматься этим. Выводы можно записывать в заметках, которые есть в данном приложении.'
  },
  {
    id: 5,
    content: 'Не пренебрегайте временными интервалами. Даже если составление дневного графика займёт у вас полчаса, это лучше, чем браться за работу без плана. Отсутствие чёткого графика даёт возможность выбирать, из-за чего вы будете принимать мелкие решения о том, какую задачу выполнять первой, какую можно отложить на вечер, а какую лучше не откладывать. Более того, вы сможете прервать работу в любой момент и отдыхать столько, сколько вам захочется. В случае с временными интервалами всё просто и эффективно: вы точно знаете, чем вам нужно заниматься прямо сейчас и когда можно будет отдохнуть. Вы приняли эти решения ещё утром, и вам больше не нужно к этому возвращаться.'
  },
  {
    id: 6,
    content: 'Ставьте телефон в режим "не беспокоить". Как бы банально это не звучало, но телефон может надолго отвлечь вас от работы. Если у вас бывают важные звонки, потратье минуту на то, чтобы отключить хотя бы уведомления в соцсетях и мессенджерах. Можно даже отложить телефон подальше от глаз. Он вам нужен лишь для того, чтобы узнать, какая сейчас задача по графику в Daily Planner. Помните, ваш залог успеха - держать фокус на текущей задаче, ни на что не отвлекаясь. Желаю успешной работы!'
  },
]

const Productivity = ({navigation, image, title}) => {

  const [activeSlide, setActiveSlide] = useState(0);
  const deviceTopSpace = useSafeAreaInsets().top || 20;
  const scrollPaddingBottom = useSafeAreaInsets().bottom + 20;

  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 170}}>
      <SlideHeading
        title={`Как повысить\nпродуктивность?`}
        image={image}
        navigation={navigation}
        paddingTop={deviceTopSpace}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ProductivitySlider
          slides={slides}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
        {
          slides.map(({content, id}, index) => {
            if (id === activeSlide) {
              return (
                <Text style={styles.description} key={index}>
                  {content}
                </Text>
              )
            }
          })
        }
        <FooterSpace />
      </ScrollView>
    </View>
  )
}

export default Productivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: 30,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#fff',
  },
  description: {
    ...textStyles.regular,
    lineHeight: 26,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
})