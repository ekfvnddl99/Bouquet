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

import { EmailRegisterAsync } from '../logics/EmailLogin';

function setTitle(step:number){
  if(step===1) return "메일로 회원가입";
  else if(step===2) return "비밀번호 설정";
  else if(step===3) return "계정 정보 입력";
  else return "회원가입 완료!";
}

export default function RegisterScreen(){
  const[step, setStep]=useState(1);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg');

  const register = async () => {
    const result = await EmailRegisterAsync(email, pw, name, profilePic);
    if (!result) {
      setStep(step+1);
    }
    else {
      alert(result);
    }
  }
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container> 
        <View style={{paddingHorizontal:20, paddingTop:20}}>
          <ProgressArea back={()=>setStep(step-1)} step={step} title={setTitle(step)} intro={null} navigation={navigation}/>
        </View>
        {step===1 ? <RegisterScreenOne onChange={()=>setStep(step+1)} navigation={navigation} setEmail={setEmail} /> :
        step===2 ? <RegisterScreenTwo onChange={()=>setStep(step+1)} pw={pw} setPw={setPw} /> :
        step===3 ? <RegisterScreenThree onChange={register} name={name} setName={setName} setProfilePic={setProfilePic} /> : 
        <RegisterScreenFour navigation={navigation}/>}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
