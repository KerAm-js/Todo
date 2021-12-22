import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MyButton from "../../components/buttons/MyButton";
import Heading from "../../components/Profile/Heading";
import ProfileData from "../../components/Profile/ProfileData";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Main = ({navigation}) => {

  const containerPaddingTop = useSafeAreaInsets().top + 35 || 20 + 35;

  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <Heading title="Профиль"/>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ProfileData 
          user={{
            login: "gendargenoevskiy",
            name: "Амир",
            surname: "Керимов",
            age: 19,
            location: "Москва",
            job: "Веб-разработчик, разработчик кроссплафторменных мобильных приложений",
            quote: '"Единственный способ никогда не проигрывать - никогда не пробовать."'
          }}
        />
        <MyButton 
          type="submit"
          title="Редактировать"
          onPress={() => console.log('pressed')}
        />
        <MyButton 
          type="danger"
          title="Выйти"
          onPress={() => console.log('pressed')}
        />
      </ScrollView>
    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scroll: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 90,
  },
})
