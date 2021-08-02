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

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ConditionButton from '../components/ConditionButton';
import NameNText from '../components/NameNText';
import BackButton from '../components/BackButton';

export default function ChaDeletionScreenTwo(){
  const[name,setName]=useState('undefined');

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16, marginBottom:20}}>
        <View style={{flex:1}}/>
        <elses.CircleImg diameter={28} source={require('../../../assets/img.jpg')}/>
      </area.RowArea>
      <text.Subtitle1 color={colors.black} style={{marginBottom:32}}>캐릭터 삭제 완료</text.Subtitle1>

      <View style={styles.middleArea}>
        <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')} style={{marginBottom:16}}/>
        <NameNText name={name} sub="님으로"/>
        <text.Subtitle2R color={colors.black}>보여 주신 새로운 모습이</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>아름다웠습니다.</text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton height={44} active={1} press={()=>{}} content="캐릭터 목록으로 돌아가기" paddingH={0} paddingV={14}/>
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