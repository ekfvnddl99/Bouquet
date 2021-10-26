import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { useSetRecoilState } from 'recoil';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// logics
import useLogin from '../logics/hooks/useLogin';
import { isNewNotification } from '../logics/atoms';
import {
  getPushNotificationsPermission,
  getNotificationCountAsync,
} from '../logics/server/Notification';
import useCharacter from '../logics/hooks/useCharacter';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import WelcomeStackNavigator from './WelcomeStackNavigator';

const prefix = Linking.createURL('/');
export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const [login] = useLogin();
  const [myCharacter] = useCharacter();
  const setIsNew = useSetRecoilState(isNewNotification);

  // 실행되자마자 처리해야 하는 것
  useEffect(() => {
    async function callLogin() {
      await login();
      await checkIsNewNotification();
      await getPushNotificationsPermission();
      setTimeout(() => {
        setIsSplash(false);
      }, 2000);
    }
    callLogin();
  }, []);

  const appState = useRef(AppState.currentState);
  const getNotificationCount = async (): Promise<number> => {
    const jsonValue = await AsyncStorage.getItem(`N${myCharacter.name}`);
    const result = jsonValue != null ? JSON.parse(jsonValue) : null;
    return result;
  };
  const getNowNotificationCount = async () => {
    const serverResult = await getNotificationCountAsync();
    if (serverResult.isSuccess) return serverResult.result;
    return -1;
  };
  const checkIsNewNotification = async () => {
    if (myCharacter.name === '') return;
    await getNotificationCount().then((before) => {
      getNowNotificationCount().then((now) => {
        if (now !== -1 && before !== null) {
          if (before < now) setIsNew(true);
          else setIsNew(false);
        }
      });
    });
  };
  useEffect(() => {
    AppState.addEventListener('change', async (nextAppState) => {
      appState.current = nextAppState;

      if (appState.current === 'active' && myCharacter.name !== '') {
        await getPushNotificationsPermission();
        await checkIsNewNotification();
      }
    });
  }, [myCharacter]);

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

      if (init !== null) {
        return `${prefix}Tab/Notification`;
      }

      return null;
    },
    subscribe(listener: (deeplink: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      // Listen to incoming links from deep linking
      Linking.addEventListener('url', onReceiveURL);

      // Listen to expo push notifications
      const tapNotification =
        Notifications.addNotificationResponseReceivedListener(() => {
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
