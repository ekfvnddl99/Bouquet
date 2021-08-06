import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// props & logic


// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import WarningText from '../components/WarningText';
import ConditionTextInput from '../components/ConditionTextInput';
import LineButton from '../components/LineButton';


interface RegisterScreenOneProps{
  onChange : Function, 
  navigation : any, 
  setEmail : Function,
  email : string,
  setAuthNum : Function,
  authNum : string
}
export default function RegisterScreenOne({onChange, navigation, setEmail, email, setAuthNum, authNum} : RegisterScreenOneProps){
  const [next, setNext] = useState(0);
  const [err1, setErr1] = useState(0);
  const [err2, setErr2] = useState(0);
  const [first, setFirst] = useState(1);

  useEffect(()=>{
    checkErr2();
  }, [authNum])

  const checkErr1=()=>{
    // 이메일 조건 써넣어야 함!
    if(!email.includes('@')) setErr1(1);
    else [setNext(1), setErr1(0)];
  }
  const checkErr2=()=>{
    // 이거 바꿔야 함! 인증번호 맞는지 아닌지로!
    // 일단 무조건 4자리 숫자 보낸다고 생각하고 한 거라서 이렇게 했는데 서버 요건에 맞게 바꾸면 됨!
    if(authNum.length>=4){
      if(authNum!=='1234') setErr2(1);
      else setErr2(0);
    }
  }

  const goBack=()=>{
    navigation.navigate("Login");
  }

  return(
    <area.ContainerBlank20>
      <ScrollView style={{flex:1}}>
      <area.FormArea height='44' style={err1===1 ? {borderWidth:1, borderColor:colors.warning_red} : null}>
        <TextInput style={{flex: 1}} placeholder={i18n.t('메일')} keyboardType='email-address' onChangeText={text => setEmail(text)} value={email} onFocus={()=>setFirst(0)}/>
        <LineButton press={next!==1 ? checkErr1 : ()=>{}} content={i18n.t("메일 인증")} color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
      </area.FormArea>
      {err1===1 ? <WarningText content="무야호" marginTop={8}/> : null}
        
      {(next && !err1) || (authNum.length>0)? 
      <View style={{marginTop:16}}>
        <ConditionTextInput height={44} placeholder="메일 인증 번호" onChange={setAuthNum} keyboard={'numeric'} active={err2===1 ? 1 : 0} value={authNum}/>
        {err2===1 ? <WarningText content="무야호" marginTop={8}/> : null}
      </View> : null}
      </ScrollView>
      <area.BottomArea>
        <View style={{alignItems: 'center'}}>
          <text.Caption color={colors.gray6}>{i18n.t('이전 페이지로 돌아가면 소셜 계정으로도 가입할 수 있어요')}</text.Caption>
        </View>

        <View style={{marginVertical:16}}>
          <ConditionButton active={!err1&&!err2 ? 1 : 0} press={!err1&&!err2 ? onChange : ()=>{}} content={i18n.t("메일로 계속하기")} paddingH={0} paddingV={14} height={45}/>
        </View>

        <area.TextBtnArea style={{marginBottom:16}}>
          <text.Body2R color={colors.black}>{i18n.t('계정이 이미 있다면')} </text.Body2R>
          <PrimaryTextButton press={goBack} content={i18n.t("로그인")} level={3}/>
        </area.TextBtnArea>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
