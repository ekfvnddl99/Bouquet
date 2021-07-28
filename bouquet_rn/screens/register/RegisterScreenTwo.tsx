import React, {Component, useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';

// props & logic
import type {RegisterProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';


function EyeSelect(eye : number){
  if(eye===1) return <EyeSvg w='18' h='18'/>;
  else return <EyeFocusSvg w='20' h='20'/>;
}

function PWCheck(pw : string){
  if(pw.length>=8 && pw.length<=32) return 1;
  return 0;
}

export default function RegisterScreenTwo({navigation} : RegisterProps){
  const [err, setErr] = useState(1);
  const[eye, setEye]=useState(1);
  const[pw,setPW]=useState('');

  const goNext=()=>{
    navigation.navigate("RegisterThree");
  }

  return(
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="비밀번호 설정" step={2} intro={null}/>

        <area.FormArea height='44' style={err===1 ? {borderWidth:1, borderColor:colors.warning_red} : null}>
          <TextInput style={{flex: 1}} placeholder='비밀번호' onChangeText={(pw)=>setPW(pw)}/>
          <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
              {EyeSelect(eye)}
          </TouchableOpacity>
        </area.FormArea>

        <ConditionText content=" 8글자 이상, 32글자 이하" active={PWCheck(pw)}/>

        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton active={1} press={goNext} content="계정 정보 입력" paddingH={0} paddingV={14}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}