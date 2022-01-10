import { Platform } from "react-native"

export const shadow = 
  Platform.OS === 'ios'
    ? {
        shadowColor: 'rgba(80, 80, 80, .11)',
        shadowOpacity: 1, 
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }
    : {
        elevation: 10,
        shadowColor: '#52006A',
      }

export const cardShadow = {
  shadowColor: 'rgba(0, 0, 0, .1)',
  shadowOpacity: 1, 
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 5,
  },
}