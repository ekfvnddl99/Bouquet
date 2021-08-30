import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// props && logic
import { deleteUserAsync } from '../../logics/User';

// components
import ConditionButton from '../../components/button/ConditionButton';
import NameNText from '../../components/text/NameNText';
import BackButton from '../../components/button/BackButton';
import { SettingStackParam } from '../../utils/types/types';
import ProfileItem from '../../components/item/ProfileItem';

export default function AccountDeletionScreenOne(){
  const[name,setName]=useState('undefined');

  async function deleteUser() {
    await deleteUserAsync();
  }

  const navigation = useNavigation();
  async function deleteNgoScreenTwo(){
    await deleteUser();
    navigation.navigate('SettingAccountDeletionTwo');
  }

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
        <BackButton/>
        <View style={{flex:1}}/>
        <ProfileItem diameter={28}/>
      </area.RowArea>

      <area.ContainerBlank20>
      <text.Subtitle1 color={colors.black} style={{marginBottom:32}}>{i18n.t('계정 삭제')}</text.Subtitle1>
      <View style={{alignItems:'center'}}>
        <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')} style={{marginBottom:16}}/>
        <NameNText name={name} sub={i18n.t('님')+","}/>
        <text.Subtitle2R color={colors.black}>{i18n.t('정말로')+ i18n.t('삭제하시겠어요')+(i18n.locale=='en' ? '?' : '')}</text.Subtitle2R>
      </View>
        <area.BottomArea style={{marginBottom:16}}>
          <View style={{alignItems: 'center'}}>
            <text.Caption color={colors.gray6} style={{marginBottom:16}}>{i18n.t('아쉽지만 계정은 삭제하면 복구하지 못해요')}</text.Caption>
          </View>
          <ConditionButton height={44} active={true} press={deleteNgoScreenTwo} content={i18n.t("계정 삭제")} paddingH={0} paddingV={14}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}