import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
    <>
      <View style={styles.heading}>
        <View style={styles.headingText}>
          {
            user.name || user.surname 
            ? <>
                <Text style={styles.title}>{`${user?.name} ${user?.surname}`}</Text>
                <Text style={styles.userData}>{user.login}</Text>
              </>
            : <>
                <Text style={styles.title}>{user.login}</Text>
              </>
          }
          {
            user.age ? <Text style={styles.userData}>{age}</Text> : null
          }
          {
            user.location ? <Text style={styles.userData}>{user.location}</Text> : null
          }
        </View>
        <Image 
          style={styles.avatar}
          source={require('../../images/alina-rubo-myU5tdqiX6g-unsplash.jpg')}
        />
      </View>
      {
        user.job
        ? <>
            <Text style={styles.subtitle}>Род деятельности</Text>
            <Text style={styles.text}>{user.job}</Text>
          </>
        : null
      }
      {
        user.quote
        ? <>
            <Text style={styles.subtitle}>Любимая цитата</Text>
            <Text style={styles.text}>{user.quote}</Text>
          </>
        : null
      }
    </>
  )
}

export default ProfileData;

const styles = StyleSheet.create({
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
    marginBottom: 30,
  },
})