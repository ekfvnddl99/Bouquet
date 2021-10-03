import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

import * as APIs from './APIUtils';

/**
 * 사용자의 고유 notification token을 expo로부터 받아오고 DB에 저장하는 함수
 * @returns
 */
export async function getPushNotificationsPermission(): Promise<void> {
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
  } else alert('실기기에서 이용해주세요.');
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

/**
 * 사용자의 고유 notification token을 DB에 저장하는 api
 * @param token expo에서 받아온 사용자의 고유 notification token
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function registerNotificationTokenAsync(
  token: string,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type registerNotificationTokenAsyncOutput = null;
  const tmpResult = await APIs.postAsync<registerNotificationTokenAsyncOutput>(
    `/notification/token`,
    { 'Content-Type': 'application/json' },
    JSON.stringify({ token }),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<registerNotificationTokenAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}
