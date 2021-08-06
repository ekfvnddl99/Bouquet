import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// components
import ProgressArea from '../components/ProgressArea';

// screens
import RegisterScreenOne from './RegisterScreenOne';
import RegisterScreenTwo from './RegisterScreenTwo';
import RegisterScreenThree from './RegisterScreenThree';
import RegisterScreenFour from './RegisterScreenFour';

import { EmailRegisterAsync } from '../logics/EmailLogin';

function setTitle(step:number){
  if(step===1) return i18n.t("메일로 회원가입");
  else if(step===2) return i18n.t("비밀번호 설정");
  else if(step===3) return i18n.t("계정 정보 입력");
  else return i18n.t("회원가입 완료!");
}

export default function RegisterScreen(){
  const[step, setStep]=useState(1);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [authNum, setAuthNum] = useState('');
  const [profilePic, setProfilePic] = useState('https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg');

  const register = async () => {
    const result = await EmailRegisterAsync(email, pw, name, profilePic);
    if (!result) setStep(step+1);
    else alert(result);
  }
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container> 
        <View style={{paddingHorizontal:20, paddingTop:20}}>
          <ProgressArea back={()=>setStep(step-1)} step={step} title={setTitle(step)} intro={null} navigation={navigation}/>
        </View>
        {step===1 ? <RegisterScreenOne onChange={()=>setStep(step+1)} navigation={navigation} setEmail={setEmail} email={email} setAuthNum={setAuthNum} authNum={authNum}/> :
        step===2 ? <RegisterScreenTwo onChange={()=>setStep(step+1)} pw={pw} setPw={setPw} /> :
        step===3 ? <RegisterScreenThree onChange={register} name={name} setName={setName} setProfilePic={setProfilePic} /> : 
        <RegisterScreenFour navigation={navigation}/>}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
