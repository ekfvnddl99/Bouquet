import React, {Component, useState} from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';
import * as text from '../../styles/styled-components/text';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';

function PWCheck(pw : string){
  if(pw.length>=8 && pw.length<=32) return 1;
  return 0;
}

export default function ChaGenerationScreenTwo({navigation} : ChaGenerationProps){
  const[eye, setEye]=useState(1);
  const[pw,setPW]=useState('');

  const goNext=()=>{
    navigation.navigate("ChaGenerationThree");
  }

  return(
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="이 캐릭터는 누구인가요?" step={2} intro="이름, 직업 등 이 캐릭터의 기본 정보를 정해 보아요."/>

        <input.FormInput height='44' placeholder='캐릭터 이름 (필수)' onChangeText={()=>{}}/>
        <ConditionText content=" 한글 10글자, 알파벳 20글자 이하" active={PWCheck(pw)}/>
        <ConditionText content=" 특수문자는 _(언더바), -(하이픈), 띄어쓰기만 사용" active={PWCheck(pw)}/>
        <ConditionText content=" 중복되지 않는 이름" active={PWCheck(pw)}/>
        <input.FormInput height='44' placeholder='생년월일' onChangeText={()=>{}} style={{marginTop:16}}/>
        <input.FormInput height='44' placeholder='직업' onChangeText={()=>{}} style={{marginTop:16}}/>
        <input.FormInput height='44' placeholder='국적' onChangeText={()=>{}} style={{marginTop:16}}/>

        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton active={1} press={goNext} content="세부 소개 입력" paddingH={0} paddingV={14}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}