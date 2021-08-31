import React, {Component, useState, useEffect} from 'react';
import {
  View,
  ScrollView, 
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';
import * as text from '../../styles/styled-components/text';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';

// props & logic
import type {ChaGenerationProps, Character} from '../../utils/types/types';
import {getByte} from '../../logics/non-server/Calculation';
import { CharacterDupAsync } from '../../logics/server/Auth';

// components
import ProgressArea from '../../components/item/ProgressItem';
import ConditionText from '../../components/text/ConditionText';
import ConditionButton from '../../components/button/ConditionButton';
import ConditionTextInput from '../../components/input/ConditionTextInput';
import WarningText from '../../components/text/WarningText';


export default function ChaGenerationScreenTwo({modify, onChange, characterToCreate, setCharacterToCreate} : {modify : number, onChange:any, characterToCreate: Character, setCharacterToCreate: Function}){
  const[IsOK, setIsOK]=useState(false);
  const[conArray, setConArray]=useState([false, false, false, false, false, false]);
  const errText=["필수 입력 항목이에요.", "이름 규칙을 지켜야 해요."];

  const[dupResult, setDupResult]=useState(false);
  useEffect(()=>{
    async function IsDupName(){
      const result = await CharacterDupAsync(characterToCreate.name);
      setDupResult(!result)
    }

    let tmpArray=[...conArray];
    if(characterToCreate.name.length>0) tmpArray[0]=true;
    else tmpArray[0]=false;
    if(getByte(characterToCreate.name)<=18 && getByte(characterToCreate.name)>0) tmpArray[1]=true;
    else tmpArray[1]=false;
    // 중복 확인
    IsDupName();
    if(characterToCreate.name.length>0 && dupResult) tmpArray[2]=true;
    else tmpArray[2]=false;
    if(characterToCreate.birth.length>0) tmpArray[3]=true;
    else tmpArray[3]=false;
    if(characterToCreate.job.length>0) tmpArray[4]=true;
    else tmpArray[4]=false;
    if(characterToCreate.nationality.length>0) tmpArray[5]=true;
    else tmpArray[5]=false;
    setConArray(tmpArray);
  }, [characterToCreate])
  useEffect(()=>{
    if(conArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  })

  return(
      <KeyboardAvoidingView style={{flex:1}} behavior={'height'}>
        <area.ContainerBlank20>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps={'always'}>
            <ConditionTextInput height={44} placeholder={i18n.t("캐릭터 이름")}
              onChange={(text: string) => {setCharacterToCreate({...characterToCreate, name: text})}}
              keyboard={'default'}
              active={!(conArray[0]&&conArray[1]&&conArray[2])}
              value={characterToCreate.name}
              warnText={!conArray[0] ? errText[0] : errText[1]}
              conditions={
                <View>
                  <ConditionText content={i18n.t("18 byte 이하")} active={conArray[1]}/>
                  <ConditionText content={i18n.t("중복되지 않는 이름")} active={conArray[2]}/>
                </View>
              }
              byte={18}
            />
            <ConditionTextInput height={44} placeholder={i18n.t("생년월일 (YYYYMMDD)")}
              onChange={(text: string) => {setCharacterToCreate({...characterToCreate, birth: text})}}
              keyboard={'numeric'}
              active={!(conArray[3])}
              value={characterToCreate.birth}
              warnText={errText[0]}
              maxLen={8}
            />
            <ConditionTextInput height={44} placeholder={i18n.t("직업")}
              onChange={(text: string) => {setCharacterToCreate({...characterToCreate, job: text})}}
              keyboard={'default'}
              active={!(conArray[4])}
              value={characterToCreate.job}
              warnText={errText[0]}
            />
            <ConditionTextInput height={44} placeholder={i18n.t("국적")}
              onChange={(text: string) => {setCharacterToCreate({...characterToCreate, nationality: text})}}
              keyboard={'default'}
              active={!(conArray[5])}
              value={characterToCreate.nationality}
              warnText={errText[0]}
            />
            <View style={{flexGrow:1}}/>
            <View style={{marginBottom:16}}>
              <ConditionButton height={44} active={IsOK} press={IsOK ? onChange : Keyboard.dismiss} content={modify===1 ? i18n.t("세부 소개 수정 완료") : i18n.t("세부 소개 입력")} paddingH={0} paddingV={14}/>
            </View>
        </ScrollView>
       
      </area.ContainerBlank20>
    </KeyboardAvoidingView>
  );
}
