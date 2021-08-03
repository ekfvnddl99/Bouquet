import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import WarningText from '../components/WarningText';
import ConditionTextInput from '../components/ConditionTextInput';
import LineButton from '../components/LineButton';

// screens
import ChaGenerationScreenOne from './ChaGenerationScreenOne';
import ChaGenerationScreenTwo from './ChaGenerationScreenTwo';
import ChaGenerationScreenThree from './ChaGenerationScreenThree';
import ChaGenerationScreenFour from './ChaGenerationScreenFour';

function setTitle(step:number){
  if(step===1) return "어떤 모습인가요?";
  else if(step===2) return "이 캐릭터는 누구인가요?";
  else if(step===3) return "어떤 캐릭터인가요?";
  else return "캐릭터 생성 완료!";
}

function setIntro(step:number){
  if(step===1) return "이 캐릭터의 겉모습을 생각해 보아요.";
  else if(step===2) return "이름, 직업 등 이 캐릭터의 기본 정보를 정해 보아요.";
  else if(step===3) return "캐릭터의 특징을 생각해 보아요.";
  else return null;
}

export default function ChaGenerationScreen({route, navigation} : ChaGenerationProps){
  const[step, setStep]=useState(1);
  const param = route.params;

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container>
        <View style={{paddingHorizontal:20, paddingTop:20}}>
          <ProgressArea back={()=>setStep(step-1)} step={step} title={setTitle(step)} intro={setIntro(step)} navigation={navigation}/>
        </View>
        {step===1 ? <ChaGenerationScreenOne modify={0} onChange={()=>setStep(step+1)}/> :
        step===2 ? <ChaGenerationScreenTwo modify={0} onChange={()=>setStep(step+1)}/> :
        step===3 ? <ChaGenerationScreenThree modify={0} onChange={()=>setStep(step+1)}/> : 
        <ChaGenerationScreenFour modify={0} navigation={navigation}/>}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
