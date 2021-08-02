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

export default function AccountDeletionScreenOne(){
  const[name,setName]=useState('undefined');

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16, marginBottom:20}}>
        <BackButton navigation={()=>{}}/>
        <View style={{flex:1}}/>
        <elses.CircleImg diameter={28} source={require('../../../assets/img.jpg')}/>
      </area.RowArea>
      <text.Subtitle1 color={colors.black} style={{marginBottom:32}}>계정 삭제</text.Subtitle1>
      <View style={{alignItems:'center'}}>
        <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')} style={{marginBottom:16}}/>
        <NameNText name={name} sub="님,"/>
        <text.Subtitle2R color={colors.black}>정말로 삭제하시겠어요?</text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{marginBottom:16}}>
          <View style={{alignItems: 'center'}}>
            <text.Caption color={colors.gray6}>아쉽지만 계정은 삭제하면 복구하지 못해요.</text.Caption>
          </View>
          <ConditionButton height={44} active={1} press={()=>{}} content="계정 삭제" paddingH={0} paddingV={14}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}