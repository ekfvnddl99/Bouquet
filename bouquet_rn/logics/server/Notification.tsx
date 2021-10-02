import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export default async function getPushNotificationsPermission(): Promise<void> {
  if (Constants.isDevice) {
    // 알림 허락 받았는지 확인
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    // 허락 안 받았으면 사용자에게 허락해달라고 요구
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // 사용자가 허락 안 하면 불가
    if (finalStatus !== 'granted') {
      alert('권한이 없어서 알림을 받을 수 없어요. 권한 설정을 해주세요.');
      return;
    }

    // token 얻어서 저장함
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    await SecureStore.setItemAsync('pushToken', token);
  } else {
    alert('실기기에서 이용해주세요.');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}
