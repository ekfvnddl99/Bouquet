import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import SettingItem from '../components/SettingItem';
import BackButton from '../components/BackButton';
import { SettingProps } from '../../utils/types';

export default function SettingScreen({navigation} : SettingProps){
  const[name,setName]=useState('undefined');

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
        <BackButton navigation={navigation}/>
        <View style={{flex:1}}/>
        <elses.CircleImg diameter={28} source={require('../../assets/img.jpg')}/>
      </area.RowArea>
      
      <View style={{marginVertical:20, paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>기본 설정</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem content="계정 프로필 수정" press={()=>navigation.navigate('SettingProfile')}/>
          <SettingItem content="캐릭터별 알림 설정" press={()=>navigation.navigate('SettingAlarm')}/>
          <SettingItem content="로그아웃" press={()=>{}}/>
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