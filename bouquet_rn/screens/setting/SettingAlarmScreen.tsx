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
import ProfileItem from '../components/ProfileItem';
import { SettingProps } from '../../utils/types';

export default function SettingAlarmScreen({navigation} : SettingProps){
  const[name,setName]=useState('undefined');

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
        <BackButton/>
        <View style={{flex:1}}/>
        <ProfileItem diameter={28}/>
      </area.RowArea>
      
      <View style={{marginVertical:20, paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>캐릭터별 알림 설정</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem content="팔로우하는 캐릭터의 새 글" press={()=>navigation.navigate('SettingAlarmCustom', {idx : 0})}/>
          <SettingItem content="내 글이 받은 햇빛" press={()=>navigation.navigate('SettingAlarmCustom', {idx : 1})}/>
          <SettingItem content="내 글에 달린 댓글" press={()=>navigation.navigate('SettingAlarmCustom', {idx : 2})}/>
          <SettingItem content="다른 캐릭터가 나를 팔로우" press={()=>navigation.navigate('SettingAlarmCustom', {idx : 3})}/>
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}