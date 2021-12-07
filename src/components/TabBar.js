import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { colors } from './constants/colors';

const TabBar = ({ state, descriptors, navigation }) => {

  return ( 
      <View style={{...styles.tabBar}}>
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
  );
};

export default TabBar;

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    width: 35,
    height: 35,
  },
  tabBar: { 
    flexDirection: 'row', 
    backgroundColor: colors.ACCENT, 
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    borderRadius: Platform.OS === 'ios' ? 25 : 0,
    height: Platform.OS === 'ios' ? 90 : 80, 
  }
})