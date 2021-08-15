import React, {Component, useState, useEffect, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import * as elses from '../../styles/styled-components/elses';

// icons
import GallerySvg from '../../assets/Gallery';

// props & logic
import {getByte} from '../logics/Calculation';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import ConditionTextInput from '../components/ConditionTextInput';
import WarningText from '../components/WarningText';

function errCheck(name:string, errList:number[], setErrList:Function){
  if(name.length===0) setErrList([...errList, 0]);
  if(getByte(name)>20 && getByte(name)>0) setErrList([...errList, 1]);
  // *** 중복 여부 체크는 2를 넣음!
}

export default function RegisterScreenThree({onChange, name, setName, setProfilePic} : {onChange : any, name: string, setName: Function, setProfilePic: Function}){
  const[IsOK, setIsOK]=useState(false);
  const[conArray, setConArray]=useState([false, false, false]);
  const errText=["별명을 입력해 주세요.", "별명 규칙을 지켜야 해요."];

  useEffect(()=>{
    let tmpArray=[...conArray];
    if(name.length>0) tmpArray[0]=true;
    else tmpArray[0]=false;
    if(getByte(name)<=20 && getByte(name)>0) tmpArray[1]=true;
    else tmpArray[1]=false;
    if(name) tmpArray[2]=true;
    else tmpArray[2]=false;
    setConArray(tmpArray);
  }, [name])
  useEffect(()=>{
    if(conArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  })

  return(
    <area.ContainerBlank20>
      <View style={{alignItems:'center', marginBottom:32}}>
        <TouchableOpacity>
          <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')}/>
          {/* <elses.Circle diameter={120}>
            <GallerySvg w='24' h='24'/>
          </elses.Circle> */}
        </TouchableOpacity>
      </View>

      <ConditionTextInput height={44} placeholder={i18n.t("별명")}
        onChange={(text: string) => setName(text)}
        keyboard={'default'}
        active={!(conArray[0]||conArray[1]||conArray[2])}
        value={name}
        warnText={!conArray[0] ? errText[0] : errText[1]}
        conditions={
          <View>
            <ConditionText content={i18n.t("20 byte 이하")} active={conArray[1]}/>
            <ConditionText content={i18n.t("중복되지 않는 이름")} active={conArray[2]}/>
          </View>
        }
        byte={20}
      />

      <area.BottomArea style={{marginBottom:16}}>
        {i18n.locale==='en' ? <View style={{alignItems:'center'}}><text.Caption color={colors.gray6}>{i18n.t('에 모두 동의하시나요')} </text.Caption></View> : null}
        <area.TextBtnArea style={{marginBottom:16}}>
          <PrimaryTextButton press={()=>{}} content={i18n.t("서비스 이용 약관")} level={2}/>
          <text.Caption color={colors.gray6}>, </text.Caption>
          <PrimaryTextButton press={()=>{}} content={i18n.t("개인정보 취급 방침")} level={2}/>
          {i18n.locale==='ko' ? <text.Caption color={colors.gray6}>{i18n.t('에 모두 동의하시나요')}</text.Caption> :<text.Caption color={colors.gray6}>?</text.Caption>}
        </area.TextBtnArea>

        <ConditionButton active={IsOK} press={IsOK ? onChange : ()=>{}} 
          content={i18n.t("필수 약관 동의 & 가입 완료")} paddingH={0} paddingV={14} height={45}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}