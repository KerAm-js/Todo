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
    content: "Tasks",
  },
  {
    title: "Цели",
    content: "Targets",
  },
]

const MainNavBar = ({
  activeType, 
  setActiveType, 
  activeContent, 
  setActiveContent, 
  navigation, 
  route
}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 55 || 20 + 55;
  return (
    <View style={{...styles.container, paddingTop: containerPaddingTop}}>
      <View style={styles.navBar}>
        <View style={styles.navBarContent}>
          {
            navigators.map((nav, index) => {
              const textActiveStyle = nav.content === activeType ? {...styles.navTextActive} : null;
              return (
                <TouchableOpacity 
                  key={index}
                  style={styles.navButton}
                  onPress={() => setActiveType(nav.content)}
                >
                  <Text style={{...styles.navText, ...textActiveStyle}}>{nav.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View>
          <TouchableOpacity 
            style={{...styles.navButton, marginRight: 0, flexDirection: "row"}}
            onPress={() => navigation.navigate("Notes")}
          >
            <Text style={{...styles.navText, ...styles.navTextActive, marginRight: 5}}>Заметки</Text>
            <Image 
              source={require('../../images/back.png')}
              style={styles.toImage}
            />
          </TouchableOpacity>
        </View>
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
              marginRight: index === arr.length - 1 ? 20 : 10
            }

            let titleStyle = {
              ...styles.title,
            }

            if (title === activeContent) {
              buttonStyle = {
                ...styles.contentButton,
                ...styles.contentButtonActive,
                marginLeft: index === 0 ? 20 : 0,
                marginRight: index === arr.length - 1 ? 20 : 10
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
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navBarContent: {
    flexDirection: "row",
  },
  navButton: {
    marginRight: 15,
    alignItems: "center",
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
  toImage: {
    width: 10,
    height: 10,
    marginBottom: 2,
    transform: [{rotate: '180deg'}]
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
  titleActive: {
    color: '#000'
  },
})