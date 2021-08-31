import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import i18n from 'i18n-js';
import { colors } from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// props & logic
import type { WelcomeProps} from '../../../utils/types/types';

// components
import ProgressArea from '../../../components/item/ProgressItem';
import ConditionButton from '../../../components/button/ConditionButton';
import NameNText from '../../../components/text/NameNText';

export default function RegisterScreenFour({name, profile, navigation} : {name:string, profile:string, navigation : any}){
  const goNext=()=>{
    navigation.popToTop();
    navigation.navigate('Tab');
  }

  return(
    <View style={{flex:1}}>
      
      <View style={styles.middleArea}>
        <elses.CircleImg diameter={120} source={{uri:profile}} style={{marginBottom:16}}/>
        <NameNText name={name} sub="님,"/>
        <text.Subtitle2R color={colors.black}>{i18n.t('환영합니다')}</text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton active={true} press={goNext} content={i18n.t("시작")} paddingH={0} paddingV={14} height={45}/>
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