import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

// logics
import useLogin from '../logics/hooks/useLogin';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import WelcomeStackNavigator from './WelcomeStackNavigator';
import { getPushNotificationsPermission } from '../logics/server/Notification';

const prefix = Linking.createURL('/');
export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const [login] = useLogin();

  // 실행되자마자 처리해야 하는 것
  useEffect(() => {
    async function callLogin() {
      await login();
      await getPushNotificationsPermission();
      setTimeout(() => {
        setIsSplash(false);
      }, 2000);
    }
    callLogin();
  }, []);

  const linking: LinkingOptions = {
    prefixes: [prefix],
    config: {
      initialRouteName: 'Welcome',
      screens: {
        Welcome: 'Welcome',
        Tab: {
          path: 'Tab',
          initialRouteName: 'Home',
          screens: {
            Home: {
              path: 'Home',
            },
            Notification: {
              path: 'Notification',
              screens: {
                NotiTabPostStack: {
                  path: 'PostStack',
                  screens: {
                    PostDetail: {
                      path: 'PostDetail/:postId/:routePrefix',
                      parse: { postId: (postId) => Number(postId) },
                    },
                  },
                },
                NotiTabProfileDetailStack: {
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
      const init = await Linking.getInitialURL();

      const response = await Notifications.getLastNotificationResponseAsync();
      const url = response?.notification.request.content.data.url;
      console.log(`init ${init}\nurl ${url}`);

      if (init !== null) return url;

      return init;
    },
    subscribe(listener: (deeplink: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      // Listen to incoming links from deep linking
      Linking.addEventListener('url', onReceiveURL);

      // Listen to expo push notifications
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const { url } = response.notification.request.content.data;
          console.log(url);
          listener(`${prefix}Tab/Home`); // 우선 최초화면으로 먼저 이동합니다. 이렇게 하지 않으면, 변수만 다른(:roomId) 동일한 화면이(ChatRoom) 이미 열려있던 경우, deep link로 인한 화면이동이 발생하지 않습니다.
          listener(url); // 원하는 화면으로 이동합니다.
        });

      return () => {
        // Clean up the event listeners
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
