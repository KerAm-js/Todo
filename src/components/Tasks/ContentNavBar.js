import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const ContentNavBar = ({activeContent, setActiveContent}) => {
  const containerPaddingTop = useSafeAreaInsets().top + 55 || 20 + 55;
  const contents = [
    {
      title: 'Все цели',
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

  return (
    <View style={{...styles.container, marginTop: containerPaddingTop}}>
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

export default ContentNavBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: '100%',
    height: '100%',
    backgroundColor: colors.ACCENT,
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
