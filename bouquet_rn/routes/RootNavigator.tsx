import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { useSetRecoilState } from 'recoil';

// logics
import useLogin from '../logics/hooks/useLogin';
import { isNewNotification } from '../logics/atoms';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import WelcomeStackNavigator from './WelcomeStackNavigator';
import { getPushNotificationsPermission } from '../logics/server/Notification';

const prefix = Linking.createURL('/');
export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const [login] = useLogin();
  const setIsNew = useSetRecoilState(isNewNotification);

  // 실행되자마자 처리해야 하는 것
  useEffect(() => {
    async function callLogin() {
      await login();
      await getPushNotificationsPermission();
      await Notifications.addNotificationReceivedListener(() => setIsNew(true));
      setTimeout(() => {
        setIsSplash(false);
      }, 2000);
    }
    callLogin();
  }, []);

  const linking: LinkingOptions = {
    prefixes: [prefix],
    config: {
      initialRouteName: 'Tab',
      screens: {
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

      console.log(`init ${init}`);

      if (init !== null) {
        return init;
      }

      /**
       * TODO Add Noti - killed
       */
      // 어차피 꺼진 상태에서 바로 가기 때문에 setIsNew 필요없음
      return `${prefix}Tab/Notification`;
    },
    subscribe(listener: (deeplink: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      // Listen to incoming links from deep linking
      Linking.addEventListener('url', onReceiveURL);

      // Listen to expo push notifications
      const tapNotification =
        Notifications.addNotificationResponseReceivedListener((response) => {
          /**
           * TODO Add Noti - fore, back
           */
          setIsNew(false);
          listener(`${prefix}Tab/Notification`);
        });

      return () => {
        // Clean up the event listeners
        Linking.removeEventListener('url', onReceiveURL);
        tapNotification.remove();
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
