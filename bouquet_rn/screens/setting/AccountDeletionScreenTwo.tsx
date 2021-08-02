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

export default function AccountDeletionScreenTwo(){
  const[name,setName]=useState('undefined');

  return(
    <area.Container>
      <text.Subtitle1 color={colors.black} style={{marginBottom:32, marginTop:30}}>계정 삭제 완료</text.Subtitle1>

      <View style={styles.middleArea}>
        <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')} style={{marginBottom:16}}/>
        <NameNText name={name} sub="님,"/>
        <text.Subtitle2R color={colors.black}>Bouquet에서 피어난</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>새로운 모습이</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>아름다웠습니다.</text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton height={44} active={1} press={()=>{}} content="완료" paddingH={0} paddingV={14}/>
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