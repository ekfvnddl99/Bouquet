import React, {Component, useState, useEffect} from 'react';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';


function EyeSelect(eye : number){
  if(eye===1) return <EyeSvg w='18' h='18'/>;
  else return <EyeFocusSvg w='20' h='20'/>;
}

function PWCheck(pw : string){
  if((pw.length>=8 && pw.length<=32)) return 1;
  return 0;
}

export default function RegisterScreenTwo({onChange, pw, setPw} : {onChange : any, pw: string, setPw : Function}){
  const [err, setErr] = useState(0);
  const [eye, setEye]=useState(1);
  const [first, setFirst]=useState(1);

  useEffect(()=>{
    let ch=PWCheck(pw);
    if(ch===1) setErr(0);
    else setErr(1);
  })

  return(
    <area.ContainerBlank20>
      <ScrollView style={{flex:1}}>
      <area.FormArea height='44' style={err===1 && first===0 ? {borderWidth:1, borderColor:colors.warning_red} : null}>
        <TextInput style={{flex: 1}} placeholder={i18n.t('비밀번호')} secureTextEntry={eye===1? true : false} onChangeText={(pw)=>setPw(pw)}/>
        <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
          {EyeSelect(eye)}
        </TouchableOpacity>
      </area.FormArea>

      <ConditionText content={i18n.t("8글자 이상, 32글자 이하")} active={PWCheck(pw)}/>
      </ScrollView>
      <area.BottomArea style={{marginBottom:16, overflow:'hidden'}}>
        <ConditionButton active={err===0 ? 1 : 0} press={err===0 ? onChange : ()=>{}} content={i18n.t("계정 정보 입력")} paddingH={0} paddingV={14} height={45}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}