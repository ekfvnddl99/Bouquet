import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ConditionButton from '../components/ConditionButton';
import NameNText from '../components/NameNText';
import BackButton from '../components/BackButton';

export default function ChaDeletionScreenTwo({profile, name, navigation}:{profile:string, name: string, navigation:any}){
  const goOverview = ()=>{
    navigation.navigate('ProfileOverview');
  }

  return(
    <area.Container>
      <View style={styles.middleArea}>
        <elses.CircleImg diameter={120} source={{uri:profile}} style={{marginBottom:16}}/>
        <NameNText name={name} sub={i18n.t("님으로")}/>
        <text.Subtitle2R color={colors.black}>{i18n.t('보여 주신 새로운 모습이')}</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>{i18n.t('아름다웠습니다')}</text.Subtitle2R>
      </View>

      <area.BottomArea style={{marginBottom:16}}>
        <ConditionButton height={44} active={true} press={goOverview} content={i18n.t("캐릭터 목록으로 돌아가기")} paddingH={0} paddingV={14}/>
      </area.BottomArea>
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