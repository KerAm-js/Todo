import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { shadow } from "../../constants/shadows";
import { textStyles } from "../../constants/textStyles";

const ProfileData = ({user}) => {

  let age = `${user.age}`;

  if (Number(age) === 0) {
    age = null;
  } else if (Number(age[age.length - 1]) === 1) {
    age = `${user.age} год`;
  } else if (Number(age[age.length - 1]) <= 4 && (Number(age[age.length - 1]) > 0)) {
    age = `${user.age} года`;
  } else {
    age = `${user.age} лет`;
  }

  return (
    <View style={{...styles.container, ...shadow}}>
      <View style={styles.heading}>
        <View style={styles.headingText}>
          {
            user.name
            ? <>
                <Text style={styles.title}>{`${user?.name || ''} ${user?.surname || ''}`}</Text>
                <Text style={styles.userData}>{user.email}</Text>
              </>
            : <Text style={styles.title}>{user.email}</Text>
          }
          {
            user.age ? <Text style={styles.userData}>{age}</Text> : null
          }
          {
            user.location 
              ? <Text style={styles.userData}>{user.location}</Text> 
              : !user.age 
                  ? <Text style={styles.userData}>Личные данные не указаны</Text> 
                  : null
          }
        </View>
        {/* <Image 
          style={styles.avatar}
          source={require('../../images/alina-rubo-myU5tdqiX6g-unsplash.jpg')}
        /> */}
      </View>
      <Text style={styles.subtitle}>Род деятельности</Text>
      {
        user.job
        ? <Text style={styles.text}>{user.job}</Text>
        : <Text style={styles.text}>Не указан</Text>
      }
      {/* <Text style={styles.subtitle}>Любимая цитата</Text>
      {
        user.quote
        ? <Text style={styles.text}>{user.quote}</Text>
        : <Text style={styles.text}>Не указана</Text>
      } */}
    </View>
  )
}

export default ProfileData;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headingText: {},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    ...textStyles.title,
    marginBottom: 5,
  },
  userData: {
    ...textStyles.small,
    marginBottom: 3,
  },
  subtitle: {
    ...textStyles.subtitle,
    marginBottom: 10,
  },
  text: {
    ...textStyles.regular,
  },
})