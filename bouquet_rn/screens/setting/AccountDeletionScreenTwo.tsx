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

// components
import ConditionButton from '../components/ConditionButton';
import NameNText from '../components/NameNText';
import BackButton from '../components/BackButton';
import { SettingStackParam } from '../../utils/types';

export default function AccountDeletionScreenTwo(){
  const[name,setName]=useState('undefined');
  const navigation = useNavigation<StackNavigationProp<SettingStackParam>>();
  const goOut=()=>{
    navigation.popToTop();
    navigation.popToTop();
    navigation.popToTop();
  }

  return(
    <area.Container>
      <area.ContainerBlank20>
      
      <text.Subtitle1 color={colors.black} style={{marginBottom:32, marginTop:10}}>{i18n.t('계정 삭제 완료')}</text.Subtitle1>

      <View style={styles.middleArea}>
        <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')} style={{marginBottom:16}}/>
        <NameNText name={name} sub={i18n.t('님')+","}/>
        <text.Subtitle2R color={colors.black}>{i18n.t('Bouquet에서 피어난')}</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>{i18n.t('새로운 모습이')}</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>{i18n.t('아름다웠습니다-계정')}</text.Subtitle2R>
      </View>

      <area.BottomArea style={{marginBottom:16}}>
        <ConditionButton height={44} active={1} press={goOut} content={i18n.t("완료")} paddingH={0} paddingV={14}/>
      </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}

const styles = StyleSheet.create({
  middleArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
})