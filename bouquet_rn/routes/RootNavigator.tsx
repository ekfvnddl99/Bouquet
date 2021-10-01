import React, { useState, useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

// logics
import useLogin from '../logics/hooks/useLogin';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import WelcomeStackNavigator from './WelcomeStackNavigator';

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
  const [login, logout] = useLogin();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  // 실행되자마자 처리해야 하는 것
  useEffect(() => {
    async function callLogin() {
      await login();
      // This listener is fired whenever a notification is received while the app is foregrounded
      // 안 봤을 때
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          // foreground
          console.log(notification.request.content.data.url);
        });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          // foreground, background
          console.log(
            `response${response.notification.request.content.data.url}`,
          );
        });
      setTimeout(() => {
        setIsSplash(false);
      }, 2000);
    }
    callLogin();
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
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

      const response = await Notifications.getLastNotificationResponseAsync();
      const url = response?.notification.request.content.data.url;
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl != null) {
        console.log(`init${initialUrl}`);
        return url;
      }

      // Handle URL from expo push notifications

      // killed
      console.log(`init2${url}`);
      return initialUrl;
    },
    subscribe(listener: (deeplink: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);
      Linking.addEventListener('url', onReceiveURL);

      // Listen to expo push notifications
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const { url } = response.notification.request.content.data;
          // foreground, background
          console.log(`subscribe${url}`);
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
