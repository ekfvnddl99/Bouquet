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
import { useRecoilState } from 'recoil';
import { bottomBarHideState } from '../logics/atoms';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import NameNText from '../components/NameNText';

export default function ChaGenerationScreenFour({profile, name, modify, navigation} : {profile:string, name:string, modify : number, navigation:any}){
  const [hide, setHide] = useRecoilState(bottomBarHideState);

  const goNext=()=>{
    setHide(false);
    navigation.popToTop();
    navigation.navigate('Profile');
  }

  return(
    <View style={{flex:1}}>
      <View style={styles.middleArea}>
        <elses.CircleImg diameter={120} source={{uri: profile}} style={{marginBottom:16}}/>
        <NameNText name={name} sub="님,"/>
        <text.Subtitle2R color={colors.black}>{modify===1 ? i18n.t("다시 피어날") : i18n.t("또 다른 모습으로")}</text.Subtitle2R>
        <text.Subtitle2R color={colors.black}>{modify===1 ? i18n.t("준비가 되었어요") : i18n.t("피어날 준비가 되었어요")}</text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton height={44} active={true} press={goNext} content={i18n.t("시작")} paddingH={0} paddingV={14}/>
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