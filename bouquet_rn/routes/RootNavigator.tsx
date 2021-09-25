import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

// logics
import useLogin from '../logics/hooks/useLogin';
import { registerForPushNotificationsAsync } from '../logics/server/Notification';

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
  const [login] = useLogin();

  // 실행되자마자 처리해야 하는 것
  useEffect(() => {
    async function callLogin() {
      await registerForPushNotificationsAsync();
      await login();
      setTimeout(() => {
        setIsSplash(false);
      }, 2000);
    }
    callLogin();
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
                HomePostStack: {
                  path: 'HomePostStack/:postId',
                  parse: { postId: (postId) => Number(postId) },
                },
                ProfileDetailStack: {
                  path: 'profile_detail/:id',
                  exact: true,
                  parse: {
                    characterId: (characterId) => Number(characterId),
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

      // return 'bouquet://Tab/Home/HomePostStack/1';

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
