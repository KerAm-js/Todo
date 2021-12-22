import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

const contents = [
  {
    title: 'Все задачи',
    image: require('../../images/allTodo.png'),
  },
  {
    title: 'Просрочено',
    image: require('../../images/dangerEllipse.png'),
  },
  {
    title: 'Выполнено',
    image: require('../../images/successEllipse.png'),
  },
]

const navigators = [
  {
    title: "Задачи на сегодня",
    pageName: "Main",
  },
  {
    title: "Цели",
    pageName: "Targets",
  },
  {
    title: "Заметки",
    pageName: "Notes",
  }
]

const MainNavBar = ({activeContent, setActiveContent, navigation, route}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 55 || 20 + 55;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <View style={styles.navBar}>
        {
          navigators.map((nav, index) => {
            const textActiveStyle = nav.pageName === route.name ? {...styles.navTextActive} : null;
            return (
              <Pressable 
                key={index}
                style={styles.navButton}
                onPress={() => navigation.navigate(nav.pageName)}
              >
                <Text style={{...styles.navText, ...textActiveStyle}}>{nav.title}</Text>
              </Pressable>
            )
          })
        }
      </View>
      <ScrollView 
        style={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          contents.map(({image, title}, index, arr) => {

            let buttonStyle = {
              ...styles.contentButton,
              marginLeft: index === 0 ? 20 : 0,
              marginRight: index === arr.length - 1 ? 20 : 15
            }

            let titleStyle = {
              ...styles.title,
            }

            if (title === activeContent) {
              buttonStyle = {
                ...styles.contentButton,
                ...styles.contentButtonActive,
                marginLeft: index === 0 ? 20 : 0,
                marginRight: index === arr.length - 1 ? 20 : 15
              };
              titleStyle = {
                ...styles.title,
                ...styles.titleActive,
              }
            }

            return (
              <TouchableOpacity 
                key={index}
                style={buttonStyle}
                onPress={() => setActiveContent(title)}
              >
                <Image 
                  style={styles.image} 
                  source={image}
                />
                <Text style={titleStyle}>{title}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
    
  )
}

export default MainNavBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: '100%',
    height: '100%',
    backgroundColor: colors.ACCENT,
  },
  navBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  navButton: {
    marginRight: 15,
  },
  navText: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "400",
    color: 'rgba(250, 250, 250, 0.6)'
  },
  navTextActive: {
    fontWeight: "500",
    color: 'rgba(250, 250, 250, 1)'
  },
  scroll: {
  },
  contentButton: {
    padding: 15,
    width: 120,
    height: 80,
    backgroundColor: 'rgba(250, 250, 250, .2)',
    borderRadius: 15,
    justifyContent: "space-between",
  },
  contentButtonActive: {
    backgroundColor: '#fff',
  },
  image: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
  titleActive: {
    color: '#000'
  },
})