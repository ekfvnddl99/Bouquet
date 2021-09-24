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
): APIs.ServerResult<null> {
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
    title: messageArray[idx],
    body: `${from}${messageArray[idx]}`,
  };

  // 서버 응답 타입 정의
  type SendNotificationAsyncOutput = null;

  const tmpResult = await APIs.postAsync<SendNotificationAsyncOutput>(
    '/post',
    { 'Content-Type': 'application/json' },
    JSON.stringify(message),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공
  if (APIs.isSuccess<SendNotificationAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '입력한 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

export async function registerForPushNotificationsAsync(): Promise<void> {
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

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
