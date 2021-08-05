import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
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

import { guest } from '../logics/atoms';
import useUser from '../logics/useUser';

export default function SettingScreen({navigation} : SettingProps){
  const[name,setName]=useState('undefined');
  const [user, setUser] = useUser();

  const logOut = async () => {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      await SecureStore.deleteItemAsync('auth');
    }
    setUser(guest);
    alert('로그아웃했습니다.');
  }

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
        <BackButton/>
        <View style={{flex:1}}/>
        <ProfileItem diameter={28}/>
      </area.RowArea>
      
      <View style={{marginVertical:20, paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>기본 설정</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem content="계정 프로필 수정" press={()=>navigation.navigate('SettingProfile')}/>
          <SettingItem content="캐릭터별 알림 설정" press={()=>navigation.navigate('SettingAlarm')}/>
          <SettingItem content="로그아웃" press={logOut}/>
        </area.NoHeightArea>
      </View>

      <View style={{marginVertical:20, paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>정보</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem content="Bouquet 소개" press={()=>{}}/>
          <SettingItem content="달달한 오렌지 떡볶이 소개" press={()=>{}}/>
          <SettingItem content="서비스 이용 약관" press={()=>{}}/>
          <SettingItem content="개인정보 취급 방침" press={()=>{}}/>
          <SettingItem content="오픈 소스 정보" press={()=>{}}/>
          <SettingItem content="문의/건의" press={()=>{}}/>
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}