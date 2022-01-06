import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const TabBar = ({ state, descriptors, navigation }) => {
  const tabBarPaddingBottom = useSafeAreaInsets().bottom || 20;
  return ( 
    <View style={styles.container}>
      <View style={{...styles.tabBar, paddingBottom: tabBarPaddingBottom + 5}}>
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
          
          const btnDisabled = isFocused;

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              disabled={btnDisabled}
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
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: 30,
    height: 30,
  },
  tabButton: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: { 
    paddingTop: 15,
    position: 'relative',
    zIndex: 100,
    flexDirection: 'row', 
    backgroundColor: colors.ACCENT, 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  }
})