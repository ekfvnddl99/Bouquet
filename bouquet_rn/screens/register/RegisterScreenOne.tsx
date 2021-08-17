import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    Alert,
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WelcomeStackParam } from '../../utils/types';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

import { EmailDupAsync } from '../logics/EmailLogin';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import WarningText from '../components/WarningText';
import ConditionTextInput from '../components/ConditionTextInput';
import LineButton from '../components/LineButton';
import CustomAlert from '../components/CustomAlert';


interface RegisterScreenProps{
  onChange : Function, 
  email:string,
  setEmail:Function,
  authNum:string,
  setAuthNum:Function,
}
export default function RegisterScreenOne({onChange, email, setEmail, authNum, setAuthNum} : RegisterScreenProps){
  const [IsOK, setIsOK] = useState(false);
  const [IsFocus, setFocus] = useState(false);
  const [next, setNext]=useState(false);

  const [con1Array, setCon1Array] = useState([false, false]);
  const [con2Array, setCon2Array] = useState([false, false]);
  const errText =["메일을 입력해 주세요.", "메일 형식대로 입력해야 해요.", "메일을 인증해 주세요.", "인증 번호를 입력해 주세요.", "인증 번호가 틀렸나 봐요."];
  const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const navigation = useNavigation<StackNavigationProp<WelcomeStackParam>>();

  useEffect(()=>{
    let tmpArray=[...con1Array];
    IsNewEmail();
    if(email.length>0) tmpArray[0]=true;
    else tmpArray[0]=false;
    if(emailReg.test(email)) tmpArray[1]=true;
    else tmpArray[1]=false;
    setCon1Array(tmpArray)
  }, [email])

  useEffect(()=>{
    let tmpArray=[...con2Array];
    if(authNum.length>0) tmpArray[0]=true;
    else tmpArray[0]=false;
    if(authNum==='1234') tmpArray[1]=true;
    else tmpArray[1]=false;
    setCon2Array(tmpArray)
  }, [authNum])

  useEffect(()=>{
    if(con1Array.includes(false) || con2Array.includes(false)) setIsOK(false);
    else setIsOK(true);
  })

  const goLogin=()=>{
    navigation.pop();
    navigation.navigate('Login');
  }

  const IsDupEmail=async()=>{
    const result = await EmailDupAsync(email);
    console.log(result)
    return result;
  }

  function IsNewEmail(){
    if(IsOK){
      setNext(false);
      setAuthNum('');
    }
  }

  function dupAlert(){
    Alert.alert(
      "이미 가입한 메일이에요.",
      "이 메일로 로그인하시겠어요?",
      [
        {text : "로그인", onPress: ()=>goLogin()},
        {text : "다른 메일로 가입", style:"cancel"}
      ]
    );
  }

  return(
    <area.ContainerBlank20>
      <area.FormArea height='44' style={IsFocus && !(con1Array[0]&&con1Array[1]) ? {borderWidth:1, borderColor:colors.warning_red} : null}>
        <TextInput style={{flex: 1}} placeholder={i18n.t('메일')} 
          keyboardType={'email-address'}
          onChangeText={(text : string) => setEmail(text)} 
          value={email} 
          onFocus={()=>setFocus(true)}/>
        <LineButton content={i18n.t("메일 인증")} 
          press={async ()=> (con1Array[0]&&con1Array[1]) ? (! await IsDupEmail() ? setNext(true) : dupAlert()) : {}} 
          color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
      </area.FormArea>
      {IsFocus && !(con1Array[0]&&con1Array[1]) ? <WarningText content={!con1Array[0] ? errText[0] : errText[1]} marginTop={8}/> : null}
        
      {authNum.length > 0 || next ? 
      <View style={{marginTop:16}}>
        <ConditionTextInput height={44} placeholder={i18n.t("메일 인증 번호")}
          onChange={(text: string) => setAuthNum(text)}
          keyboard={'numeric'}
          active={!(con2Array[0] && con2Array[1])}
          value={authNum}
          warnText={!con2Array[0] ? errText[3] : errText[4]}
        />
      </View> : null}

      <area.BottomArea>
        <View style={{alignItems: 'center'}}>
          <text.Caption color={colors.gray6}>{i18n.t('이전 페이지로 돌아가면 소셜 계정으로도 가입할 수 있어요')}</text.Caption>
        </View>

        <View style={{marginVertical:16}}>
          <ConditionButton active={IsOK} press={IsOK ? onChange : ()=>{}} content={i18n.t("메일로 계속하기")} paddingH={0} paddingV={14} height={45}/>
        </View>

        <area.TextBtnArea style={{marginBottom:16}}>
          <text.Body2R color={colors.black}>{i18n.t('계정이 이미 있다면')} </text.Body2R>
          <PrimaryTextButton press={goLogin} content={i18n.t("로그인")} level={3}/>
        </area.TextBtnArea>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
