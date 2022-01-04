import * as Notifications from 'expo-notifications';

async function requestPermissionsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  if (!settings.granted) {
    const result = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
    if (result.status === 'granted') {
      return true;
    }
    return false;
  } else {
    return true;
  }
}

export const setNotification = (title, body, time) => {
  const isNotifictaionAvailable = requestPermissionsAsync();
  if (isNotifictaionAvailable && time && time > 1) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {seconds: time},
    });
  }
} 

export const presentNotification = (title, body) => {
  const isNotifictaionAvailable = requestPermissionsAsync();
  if (isNotifictaionAvailable) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  }
}
