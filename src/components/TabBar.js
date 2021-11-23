import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TabBar = ({ state, descriptors, navigation }) => {

  return ( 
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let image = <Image 
            source={require('../images/home.png')}
            style={styles.image}
          /> ;

          if (isFocused) {
            image = <Image 
              source={require('../images/home_active.png')}
              style={styles.image}
            /> ;
          }

          if (options.tabBarLabel === 'Tasks') {
            if (isFocused) {
              image = <Image 
                source={require('../images/todo_list_active.png')}
                style={styles.image}
              /> ;
            } else {
              image = <Image 
                source={require('../images/todo_list.png')}
                style={styles.image}
              /> ;
            }

          } else if (options.tabBarLabel === 'Profile') {
            if (isFocused) {
              image = <Image 
                source={require('../images/user_active.png')}
                style={styles.image}
              /> ;
            } else {
              image = <Image 
                source={require('../images/user.png')}
                style={styles.image}
              /> ;
            }
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {
                image
              }
            </TouchableOpacity>
          );
        })}
      </View> 
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  container: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: 10,
    height: 100,
  },
  tabBar: { 
    flexDirection: 'row', 
    height: 80, 
    width: 360,
    backgroundColor: '#293559', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: .5, 
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  }
})