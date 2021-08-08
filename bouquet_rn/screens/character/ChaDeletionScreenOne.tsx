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

export default function ChaDeletionScreenOne({onChange}:{onChange:any}){
  const[name,setName]=useState('undefined');

  return(
    <View style={{flex:1}}>
      <View style={{alignItems:'center'}}>
        <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')} style={{marginBottom:16}}/>
        <text.Subtitle2R color={colors.black}>{i18n.t('정말로')}</text.Subtitle2R>
        <NameNText name={name} sub={i18n.t("님을")}/>
        <text.Subtitle2R color={colors.black}>{i18n.t('삭제하시겠어요')}</text.Subtitle2R>
      </View>

      <area.BottomArea style={{marginBottom:16}}>
        <View style={{alignItems: 'center'}}>
          <text.Caption color={colors.gray6} style={{marginBottom:16}}>{i18n.t('아쉽지만 캐릭터는 삭제하면 복구하지 못해요')}</text.Caption>
        </View>
        <ConditionButton height={44} active={true} press={onChange} content={i18n.t("캐릭터 삭제")} paddingH={0} paddingV={14}/>
      </area.BottomArea>
    </View>
  );
}