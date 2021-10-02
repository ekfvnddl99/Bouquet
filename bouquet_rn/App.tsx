import React from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import i18n from 'i18n-js';
import { RecoilRoot } from 'recoil';

import AppStack from './routes/RootNavigator';
import SplashScreen from './screens/former/SplashScreen';

const translationGetters = {
  en: require('./utils/language/en.json'),
  ko: require('./utils/language/ko.json'),
};

const setI18nConfig = () => {
  i18n.translations = translationGetters;
  // i18n.locale = Localization.locale;
  i18n.locale = 'ko';
  i18n.fallbacks = true;
};

// 앱 상태가 foreground 때 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App(): React.ReactElement {
  const [loaded] = useFonts({
    bold: require('./assets/fonts/Pretendard-Bold.otf'),
    light: require('./assets/fonts/Pretendard-Light.otf'),
    regular: require('./assets/fonts/Pretendard-Regular.otf'),
    semibold: require('./assets/fonts/Pretendard-SemiBold.otf'),
    Bbold: require('./assets/fonts/NanumBarunpenB.otf'),
    Bregular: require('./assets/fonts/NanumBarunpenR.otf'),
  });

  if (!loaded) {
    return null;
  }

  setI18nConfig();
  return (
    <RecoilRoot>
      <StatusBar backgroundColor="transparent" />
      <AppStack />
    </RecoilRoot>
  );
  return <SplashScreen />;
}
