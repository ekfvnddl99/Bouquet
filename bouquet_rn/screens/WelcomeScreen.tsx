import * as React from 'react';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  View, Platform
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../styles/colors';
import * as area from '../styles/styled-components/area';
import * as text from '../styles/styled-components/text';

// icons
import LogoSvg from '../assets/Logo';
import MailSvg from '../assets/Mail';
import AppleSvg from '../assets/Apple';
import GoogleSvg from '../assets/Google';
import TitleSvg from '../assets/Title';

// props & logic
import type {WelcomeProps} from '../utils/types';
import GoogleSignInAsync  from './logics/GoogleLogin';
import useUser from './logics/useUser';

// components
import LoginButton from './components/LoginButton';
import PrimaryTextButton from './components/PrimaryTextButton';

import {atom, useRecoilState} from 'recoil';
import { useEffect } from 'react';
export const viewTop=atom({
  key: 'top',
  default: 0
});
export const viewBottom=atom({
  key: 'bottom',
  default: 0
});

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const[top, setTop]=useRecoilState(viewTop);
  const[bottom, setBottom]=useRecoilState(viewBottom);
  const navigation = useNavigation();
  useEffect(()=>{
    setTop(insets.top);
    setBottom(insets.bottom);
  },[])

  const goTabs =()=>{
    navigation.navigate("Tab");
  };

  // 이렇게 함수를 만들어줘야 welcome 나오고 버튼 눌렀을 때 login이 나온다.
  const goLogin = ()=>{
    navigation.navigate("Login");
  }

  const goRegister = ()=>{
    navigation.navigate("Register");
  }

  return(
    <View style={{flex:1, backgroundColor:colors.gray0, paddingTop:top}}>
      <area.ContainerBlank20>
        <View style={{alignItems:'center', marginTop: 70}}>
            <LogoSvg w='100' h='100'/>
        </View>
        <View style={{alignItems:'center', marginTop: 15}}>
            <TitleSvg w='170' h='54'/>
        </View>

        <area.BottomArea>
            <LoginButton sentence={i18n.t('메일로 가입하기')} tag={<MailSvg w='15' h='15'/>} press={goRegister}/>
            <LoginButton sentence={i18n.t("Google로 계속하기")} tag={<GoogleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
            {Platform.OS==='ios' ? <LoginButton sentence={i18n.t("Apple로 계속하기")} tag={<AppleSvg w='15' h='15'/>} press={GoogleSignInAsync}/> : null}
        </area.BottomArea>

        <area.TextBtnArea style={{marginTop:15}}>
            <text.Button2R color={colors.black}>{i18n.t('또는')}</text.Button2R>
            <PrimaryTextButton press={goLogin} content={i18n.t("로그인")} level={1}/>
        </area.TextBtnArea>
      </area.ContainerBlank20>

        <area.TextBackgroundBtnArea>
            <text.Button2B color={colors.black}>{i18n.t('우선 알아보고 싶다면')}</text.Button2B>
            <PrimaryTextButton press={goTabs} content={i18n.t("미리보기")} level={1}/>
        </area.TextBackgroundBtnArea>
        <View style={{height:bottom, backgroundColor:colors.white}}/>
    </View>
  );
}