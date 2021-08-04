import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// props & logic
import type {WelcomeProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import WarningText from '../components/WarningText';
import ConditionTextInput from '../components/ConditionTextInput';
import LineButton from '../components/LineButton';

// screens
import RegisterScreenOne from './RegisterScreenOne';
import RegisterScreenTwo from './RegisterScreenTwo';
import RegisterScreenThree from './RegisterScreenThree';
import RegisterScreenFour from './RegisterScreenFour';

function setTitle(step:number){
  if(step===1) return "메일로 회원가입";
  else if(step===2) return "비밀번호 설정";
  else if(step===3) return "계정 정보 입력";
  else return "회원가입 완료!";
}

export default function RegisterScreen(){
  const[step, setStep]=useState(1);
  const navigation = useNavigation();
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container> 
        <View style={{paddingHorizontal:20, paddingTop:20}}>
          <ProgressArea back={()=>setStep(step-1)} step={step} title={setTitle(step)} intro={null} navigation={navigation}/>
        </View>
        {step===1 ? <RegisterScreenOne onChange={()=>setStep(step+1)} navigation={navigation}/> :
        step===2 ? <RegisterScreenTwo onChange={()=>setStep(step+1)}/> :
        step===3 ? <RegisterScreenThree onChange={()=>setStep(step+1)}/> : 
        <RegisterScreenFour navigation={navigation}/>}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
