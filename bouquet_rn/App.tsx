import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {RecoilRoot, atom, useRecoilState} from 'recoil';
import AppLoading from 'expo-app-loading';

import AppStack from './screens/'

async function getFonts() {
  return await Font.loadAsync({
    'bold': require('./assets/fonts/Pretendard-Bold.otf'),
    'light': require('./assets/fonts/Pretendard-Light.otf'),
    'regular': require('./assets/fonts/Pretendard-Regular.otf'),
    'semibold': require('./assets/fonts/Pretendard-SemiBold.otf'),
  });
}

const translationGetters = {
  en: require('./utils/language/en.json'),
  ko: require('./utils/language/ko.json')
}

const setI18nConfig = () => {
  i18n.defaultLocale = 'en';
  i18n.translations = translationGetters;
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
}

export default function App() {
  const[font, setFont]=useState(0);

  useEffect(() => {
    getFonts();
    setFont(1);
  }, []);

  setI18nConfig();
  if(font){
    return (
      <RecoilRoot>
        <AppStack/>
      </RecoilRoot>
    );
  }
  else{
    return <AppLoading/>
  }
}