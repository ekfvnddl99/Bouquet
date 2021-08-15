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
import WarningText from '../components/WarningText';

function EyeSelect(eye : number){
  if(eye===1) return <EyeSvg w='18' h='18'/>;
  else return <EyeFocusSvg w='20' h='20'/>;
}

type RegisterScreenProps={
  onChange : Function, 
  pw:string,
  setPW:Function
}
export default function RegisterScreenTwo({onChange, pw, setPW} : RegisterScreenProps){
  const [IsOK, setIsOK] = useState(false);
  const [IsFocus, setFocus] = useState(false);
  const [eye, setEye]=useState(1);

  const [conArray, setConArray] = useState([false, false]);
  const errText =["비밀번호를 입력해 주세요.", "비밀번호 규칙을 지켜야 해요."];

  useEffect(()=>{
    let tmpArray=[...conArray];
    if(pw.length>0) tmpArray[0]=true;
    else tmpArray[1]=false;
    if((pw.length>=8 && pw.length<=32)) tmpArray[1]=true;
    else tmpArray[1]=false;
    setConArray(tmpArray);
  }, [pw])
  useEffect(()=>{
    if(conArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  })

  return(
    <area.ContainerBlank20>
      <area.FormArea height='44' style={ IsFocus && !(conArray[0] && conArray[1])? {borderWidth:1, borderColor:colors.warning_red} : null}>
        <TextInput style={{flex: 1}} placeholder={i18n.t('비밀번호')} secureTextEntry={eye===1? true : false} 
          onChangeText={(text : string)=>setPW(text)} onFocus={()=>setFocus(true)} value={pw}/>
        <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
          {EyeSelect(eye)}
        </TouchableOpacity>
      </area.FormArea>
      {IsFocus && !(conArray[0] && conArray[1]) ? <WarningText content={!conArray[0] ? errText[0] : errText[1]} marginTop={8}/> : null}

      <ConditionText content={i18n.t("8글자 이상, 32글자 이하")} active={conArray[1]}/>

      <area.BottomArea style={{marginBottom:16}}>
        <ConditionButton active={IsOK} press={IsOK ? onChange : ()=>{}} content={i18n.t("계정 정보 입력")} paddingH={0} paddingV={14} height={45}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}