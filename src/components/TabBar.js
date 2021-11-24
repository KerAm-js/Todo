import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, shadowStyles } from '../../constants';
import GradientLayout from '../layouts/GradientLayout';

const TabBar = ({ state, descriptors, navigation }) => {

  return ( 
    <GradientLayout style={styles.container}>
      <View style={{...styles.tabBar, ...shadowStyles}}>
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
    </GradientLayout>
    
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
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    height: 120,
  },
  tabBar: { 
    flexDirection: 'row', 
    height: 80, 
    width: 360,
    backgroundColor: colors.ACCENT, 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 20,
  }
})