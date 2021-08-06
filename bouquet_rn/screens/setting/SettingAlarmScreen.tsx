import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import SettingItem from '../components/SettingItem';
import BackButton from '../components/BackButton';
import ProfileItem from '../components/ProfileItem';
import { SettingProps } from '../../utils/types';

export default function SettingAlarmScreen(){
  const[name,setName]=useState('undefined');
  const navigation = useNavigation();
  let titles = [i18n.t("팔로우하는 캐릭터의 새 글"), i18n.t("내 글이 받은 햇빛"), i18n.t("내 글에 달린 댓글"), i18n.t("다른 캐릭터가 나를 팔로우")];

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
        <BackButton/>
        <View style={{flex:1}}/>
        <ProfileItem diameter={28}/>
      </area.RowArea>
      
      <View style={{marginVertical:20, paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>{i18n.t('캐릭터별 알림 설정')}</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem content={titles[0]} press={()=>navigation.navigate('SettingAlarmCustom', {title:titles[0]})}/>
          <SettingItem content={titles[1]} press={()=>navigation.navigate('SettingAlarmCustom', {title:titles[1]})}/>
          <SettingItem content={titles[2]} press={()=>navigation.navigate('SettingAlarmCustom', {title:titles[2]})}/>
          <SettingItem content={titles[3]} press={()=>navigation.navigate('SettingAlarmCustom', {title:titles[3]})}/>
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}