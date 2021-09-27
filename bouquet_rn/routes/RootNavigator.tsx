import React, { useState, useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

// logics
import useLogin from '../logics/hooks/useLogin';
import { registerForPushNotificationsAsync } from '../logics/server/Notification';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import WelcomeStackNavigator from './WelcomeStackNavigator';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log(data);
    console.log(error);
    console.log(executionInfo);
  },
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

// 앱 상태가 foreground 때 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const [login] = useLogin();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  // 실행되자마자 처리해야 하는 것
  useEffect(() => {
    async function callLogin() {
      await registerForPushNotificationsAsync();
      // This listener is fired whenever a notification is received while the app is foregrounded
      // 안 봤을 때
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          /**
           * TODO 알람 탭에 반영
           */
          console.log(`This is noti`);
          console.log(notification);
        });
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      // 들어가서 확인했을 때
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(`This is response`);
          console.log(response);
        });
      await login();
      setTimeout(() => {
        setIsSplash(false);
      }, 2000);
    }
    callLogin();
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const linking: LinkingOptions = {
    prefixes: ['bouquet://'],
    config: {
      screens: {
        Welcome: {
          path: 'Welcome',
        },
        Tab: {
          path: 'Tab',
          screens: {
            Home: {
              path: 'Home',
              screens: {
                HomeTabPostStack: {
                  path: 'PostStack',
                  screens: {
                    PostDetail: {
                      path: 'PostDetail/:postId/:routePrefix',
                      parse: { postId: (postId) => Number(postId) },
                    },
                  },
                },
                HomeTabProfileDetailStack: {
                  path: 'ProfileStack',
                  screens: {
                    ProfileDetail: {
                      path: 'ProfileDetail/:characterName/:routePrefix',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    async getInitialURL(): Promise<string> {
      // First, you may want to do the default deep link handling
      // Check if app was opened from a deep link
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl != null) {
        return initialUrl;
      }

      // Handle URL from expo push notifications
      const response = await Notifications.getLastNotificationResponseAsync();
      const url = response?.notification.request.content.data.url;
      return url;
    },
    subscribe(listener: (deeplink: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);
      Linking.addEventListener('url', onReceiveURL);

      // Listen to expo push notifications
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const { url } = response.notification.request.content.data;
          listener(url);
        });

      return () => {
        Linking.removeEventListener('url', onReceiveURL);
        subscription.remove();
      };
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        {isSplash ? <SplashScreen /> : <WelcomeStackNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
