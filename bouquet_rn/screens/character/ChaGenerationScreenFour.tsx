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
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import NameNText from '../components/NameNText';

export default function ChaGenerationScreenFour({modify, navigation} : {modify : number, navigation:any}){
  const[name,setName]=useState('undefined');

  const goNext=()=>{
    navigation.popToTop();
    navigation.navigate('Profile');
  }

  return(
    <View style={{flex:1}}>
      <View style={styles.middleArea}>
        <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')} style={{marginBottom:16}}/>
        <NameNText name={name} sub="님,"/>
        <text.Subtitle2R color={colors.black}>{modify===1 ? "다시 피어날" : "또 다른 모습으로"}</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>{modify===1 ? "준비가 되었어요!" : "피어날 준비가 되었어요!"}</text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton height={44} active={1} press={goNext} content="시작" paddingH={0} paddingV={14}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </View>
  );
}

const styles = StyleSheet.create({
  middleArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
})