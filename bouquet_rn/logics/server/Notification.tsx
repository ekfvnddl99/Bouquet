import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

// logics
import * as APIs from './APIUtils';

/**
 * TODO route 이름 바꿔야함.
 * @param from 누구에게서 알림이 왔는지
 * @param category 어떤 내용의 알림인지
 * * follow(팔로우), likeComment(댓글 좋아요), likePost(글 좋아요), comment(댓글 달림)
 * @returns
 */
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
export async function sendPushNotificationAsync(
  from: string,
  category: string,
): Promise<Response> {
  const messageArray = [
    {
      category: 'follow',
      title: '당신을 팔로우해요.',
      body: '님이 당신을 팔로우해요.',
    },
    {
      category: 'likeComment',
      title: '당신의 댓글을 좋아해요.',
      body: '님이 당신의 댓글을 좋아해요.',
    },
    {
      category: 'likePost',
      title: '당신의 게시글을 좋아해요.',
      body: '님이 당신의 게시글을 좋아해요.',
    },
    {
      category: 'comment',
      title: '당신의 게시글에 댓글을 달았어요.',
      body: '님이 당신의 게시글에 댓글을 달았어요.',
    },
  ];
  let idx = 0;
  messageArray.map((obj, index) => {
    if (obj.category === category) idx = index;
    return true;
  });
  const message = {
    to: await SecureStore.getItemAsync('pushToken'),
    sound: 'default',
    title: messageArray[idx].title,
    body: `${from}${messageArray[idx].body}`,
  };

  const result = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  return result;
}

export async function registerForPushNotificationsAsync(): Promise<void> {
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
      alert('Failed to get push token for push notification!');
      return;
    }

    // token 얻어서 저장함
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    await SecureStore.setItemAsync('pushToken', token);
  } else {
    alert('Must use physical device for Push Notifications');
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
