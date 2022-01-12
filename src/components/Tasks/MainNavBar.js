import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { textStyles } from "../../constants/textStyles";

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
  deviceTopSpace
}) => {
  return (
    <View style={{...styles.container, paddingTop: deviceTopSpace + 10}}>
      <View style={styles.navBar}>
        <View style={styles.navBarContent}>
          {
            navigators.map((nav, index) => {
              const textActiveStyle = nav.content === activeType ? {...styles.navTextActive} : null;
              let btnDisable = nav.content === activeType ? true : false;
              return (
                <TouchableOpacity 
                  key={index}
                  style={styles.navButton}
                  onPress={() => setActiveType(nav.content)}
                  disabled={btnDisable}
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

            let btnDisable = false;

            if (title === activeContent) {
              btnDisable = true
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
                disabled={btnDisable}
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
    marginBottom: 10,
    height: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navBarContent: {
    flexDirection: "row",
  },
  navButton: {
    marginRight: 15,
    height: '100%',
    minWidth: 60,
  },
  navText: {
    ...textStyles.small,
    color: 'rgba(250, 250, 250, 0.6)'
  },
  navTextActive: {
    color: 'rgba(250, 250, 250, 1)'
  },
  scroll: {
  },
  contentButton: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    height: 80,
    minWidth: 120,
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
    transform: [{rotate: '180deg'}],
    alignSelf: "center",
    marginBottom: 9,
  },
  title: {
    ...textStyles.navBarSize,
    color: '#fff',
  },
  titleActive: {
    color: '#000'
  },
})