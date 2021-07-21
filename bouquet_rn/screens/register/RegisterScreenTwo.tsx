import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';

// props & logic
import type {RegisterProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';


function EyeSelect(eye : number){
  if(eye===1){
      return(
          <EyeSvg w='18' h='18'/>
      );
  }
  else{
      return(
          <EyeFocusSvg w='20' h='20'/>
      );
  }
}

function PWCheck(pw : string){
  if(pw.length>=8 && pw.length<=32) return 1;
  return 0;
}

export default function RegisterScreenTwo({navigation} : RegisterProps){
  const[eye, setEye]=useState(1);
  const[pw,setPW]=useState('undefined');

  const goNext=()=>{
    navigation.navigate("RegisterThree");
  }

  return(
    <area.Container>
      <area.ContainerBlank>
        <ProgressArea navigation={navigation} title="비밀번호 설정" step={2}/>

        <area.FormArea>
          <TextInput style={{flex: 1}} placeholder='비밀번호' onChangeText={(pw)=>setPW(pw)}/>
          <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
              {EyeSelect(eye)}
          </TouchableOpacity>
        </area.FormArea>

        <ConditionText condition=" 8글자 이상, 32글자 이하" active={PWCheck(pw)}/>

        <area.BottomArea>
          <button.GrayBtnButton onPress={goNext}>
            <text.GrayBtnText>계정 정보 입력</text.GrayBtnText>
          </button.GrayBtnButton>
        </area.BottomArea>
      </area.ContainerBlank>
    </area.Container>
  );
}