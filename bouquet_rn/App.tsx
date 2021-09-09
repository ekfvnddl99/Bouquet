import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as Localization from 'expo-localization';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js';
import { RecoilRoot } from 'recoil';

import AppStack from './routes/RootNavigator';
import SplashScreen from './screens/former/SplashScreen';

async function getFonts() {
  const font = await Font.loadAsync({
    bold: require('./assets/fonts/Pretendard-Bold.otf'),
    light: require('./assets/fonts/Pretendard-Light.otf'),
    regular: require('./assets/fonts/Pretendard-Regular.otf'),
    semibold: require('./assets/fonts/Pretendard-SemiBold.otf'),
    Bbold: require('./assets/fonts/NanumBarunpenB.otf'),
    Bregular: require('./assets/fonts/NanumBarunpenR.otf'),
  });
  return font;
}

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

export default function App(): React.ReactElement {
  const [font, setFont] = useState(0);

  useEffect(() => {
    getFonts();
    setFont(1);
  }, []);

  setI18nConfig();
  if (font) {
    return (
      <RecoilRoot>
        <StatusBar backgroundColor="transparent" />
        <AppStack />
      </RecoilRoot>
    );
  }
  return <SplashScreen />;
}
