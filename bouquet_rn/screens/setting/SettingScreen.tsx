import React, {Component, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import SettingItem from '../components/SettingItem';
import BackButton from '../components/BackButton';
import { SettingProps } from '../../utils/types';
import ProfileItem from '../components/ProfileItem';

import { guest, noCharacter } from '../logics/atoms';
import useUser from '../logics/useUser';
import useCharacter from '../logics/useCharacter';

export default function SettingScreen(){
  const [user, setUser] = useUser();
  const [character, setCharacter] = useCharacter();
  const navigation = useNavigation();

  const logOut = async () => {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      await SecureStore.deleteItemAsync('auth');
    }
    alert('로그아웃했습니다.');
    setUser(guest);
    setCharacter(noCharacter);
  }

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
        <BackButton/>
        <View style={{flex:1}}/>
        <TouchableOpacity onPress={()=>navigation.navigate('SettingAccount')}>
          <elses.CircleImg diameter={28} source={{uri:user.profileImg}}/>
        </TouchableOpacity>
      </area.RowArea>
      
      <View style={{marginVertical:20, paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>{i18n.t('기본 설정')}</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem content={i18n.t("계정 프로필 수정")} press={()=>navigation.navigate('SettingProfile')}/>
          <SettingItem content={i18n.t("캐릭터별 알림 설정")} press={()=>navigation.navigate('SettingAlarm')}/>
          <SettingItem content={i18n.t("로그아웃")} press={logOut}/>
        </area.NoHeightArea>
      </View>

      <View style={{marginVertical:20, paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>정보</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem content={i18n.locale==='en' ? i18n.t('소개')+"Bouquet?" : "Bouquet "+i18n.t('소개')} press={()=>{}}/>
          <SettingItem content={i18n.locale==='en' ? i18n.t('소개')+i18n.t('달달한 오렌지 떡볶이')+'?' : i18n.t('달달한 오렌지 떡볶이')+' '+i18n.t('소개')} press={()=>{}}/>
          <SettingItem content={i18n.t("서비스 이용 약관")} press={()=>{}}/>
          <SettingItem content={i18n.t("개인정보 취급 방침")} press={()=>{}}/>
          <SettingItem content={i18n.t("오픈 소스 정보")} press={()=>{}}/>
          <SettingItem content={i18n.t("문의/건의")} press={()=>{}}/>
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}