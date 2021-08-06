import React, {Component, useState} from 'react';
import {
  View,
  ScrollView, 
  TouchableWithoutFeedback,
  Keyboard} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';
import * as text from '../../styles/styled-components/text';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';
import {getByte} from '../logics/Calculation';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';
import ConditionTextInput from '../components/ConditionTextInput';
import WarningText from '../components/WarningText';

function PWCheck(pw : string){
  if(pw.length>=8 && pw.length<=32) return 1;
  return 0;
}

export default function ChaGenerationScreenTwo({modify, onChange} : {modify : number, onChange:any}){
  const[err, setErr] =useState(1);
  const[eye, setEye]=useState(1);
  const[pw,setPW]=useState('');
  const[name, setName]=useState('');

  return(
      
        <area.ContainerBlank20>
        <ScrollView>
          <ConditionTextInput height={44} placeholder={i18n.t("캐릭터 이름 (필수)")} onChange={setName} keyboard={'default'} active={1}/>
          <area.RowArea style={{marginTop:8}}>
            <View style={{flex:1}}>{err===1 ? <WarningText content="무야호" marginTop={0}/> : null}</View>
            <text.Caption color={colors.gray6}>{getByte(name)} / 20 byte</text.Caption>
          </area.RowArea>
          <ConditionText content={i18n.t("18 byte 이하")} active={PWCheck(pw)}/>
          <ConditionText content={i18n.t("중복되지 않는 이름")} active={PWCheck(pw)}/>
          <input.FormInput height='44' placeholder={i18n.t('생년월일')} onChangeText={()=>{}} style={{marginTop:16}} keyboardType='numeric'/>
          <input.FormInput height='44' placeholder={i18n.t('직업')} onChangeText={()=>{}} style={{marginTop:16}}/>
          <input.FormInput height='44' placeholder={i18n.t('국적')} onChangeText={()=>{}} style={{marginTop:16}}/>

          <area.BottomArea>
          </area.BottomArea>
      </ScrollView>
      <area.BottomArea style={{marginBottom:16, overflow:'hidden'}}>
        <ConditionButton height={44} active={1} press={onChange} content={modify===1 ? i18n.t("세부 소개 수정 완료") : i18n.t("세부 소개 입력")} paddingH={0} paddingV={14}/>
      </area.BottomArea>
        </area.ContainerBlank20>
  );
}