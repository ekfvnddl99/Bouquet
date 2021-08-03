import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { viewBottom, viewTop } from './WelcomeScreen';
import {colors} from '../styles/colors';
import * as area from '../styles/styled-components/area';
import * as text from '../styles/styled-components/text';
import * as input from '../styles/styled-components/input';

// icons
import EyeSvg from '../assets/Eye';
import EyeFocusSvg from '../assets/EyeFocus';
import GoogleSvg from '../assets/Google';
import AppleSvg from '../assets/Apple';

// props & logic
import type {WelcomeProps} from '../utils/types'
import GoogleSignInAsync from './logics/GoogleLogin';
import AppleSignInAsync from './logics/AppleLogin';

// components
import LoginButton from './components/LoginButton';
import BackButton from './components/BackButton';
import ConditionButton from './components/ConditionButton';
import PrimaryTextButton from './components/PrimaryTextButton';
import WarningText from './components/WarningText';

function CheckErr(mail:string) : string | undefined{
  if(mail==='456') return '메일이나 비밀번호가 틀렸나 봐요.';
  else null;
}


function EyeSelect(eye : number){
  if(eye===1){
    return(<EyeSvg w='18' h='18'/>);
  }
  else{
    return(<EyeFocusSvg w='20' h='20'/>);
  }
}

export default function LoginScreen({navigation} : WelcomeProps){
    const[mail, setMail]=useState('456');
    const[err, setErr] = useState(1);
    const[eye, setEye]=useState(1);
    const top=useRecoilValue(viewTop);
    const bottom = useRecoilValue(viewBottom);

    const goTabs =()=>{
      navigation.replace("Tab");
    };

    const goRegister = () =>{
      navigation.navigate("Register");
    }

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, backgroundColor:colors.gray0, paddingTop:top}}>
          <area.ContainerBlank20>
            <ScrollView>
            <BackButton navigation={navigation}/>
            <View style={{marginTop:30}}/>
            <text.Subtitle1 color={colors.black}>로그인</text.Subtitle1>
            <View style={{marginTop:32}}/>
            <input.FormInput height='44' placeholder='메일' onChangeText={(mail)=>setMail(mail)} keyboardType='email-address'/>
            <area.FormArea height='44' style={{marginTop:16}}>
              <TextInput style={{flex: 1}} placeholder='비밀번호' secureTextEntry={eye===1? true : false}/>
              <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
                  {EyeSelect(eye)}
              </TouchableOpacity>
            </area.FormArea>

            <View style={{alignItems:'center'}}>
              {err===1 ? <WarningText content={CheckErr(mail)} marginTop={16}/> : null}
              <View style={{marginTop:16}}><ConditionButton active={1} press={()=>{}} content="로그인" paddingH={40} paddingV={14} height={45}/></View>
            </View>

            <area.TextBtnArea style={{marginTop:16}}>
              <text.Caption color={colors.black}>비밀번호를 잊었나요? </text.Caption>
              <PrimaryTextButton press={()=>{}} content="계정 찾기" level={2}/>
            </area.TextBtnArea>
            </ScrollView>

            <area.BottomArea style={{overflow:'hidden'}}>
              <LoginButton sentence="Google로 계속하기" tag={<GoogleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
              <LoginButton sentence="Apple로 계속하기" tag={<AppleSvg w='15' h='15'/>} press={()=>{}}/>

              <area.TextBtnArea style={{marginTop:15, overflow:'hidden'}}>
              <text.Body2R color={colors.black}>계정이 없다면? </text.Body2R>
              <PrimaryTextButton press={goRegister} content="회원가입" level={1}/>
            </area.TextBtnArea>
            </area.BottomArea>



          </area.ContainerBlank20>

          <area.TextBackgroundBtnArea style={{overflow:'hidden'}}>
            <text.Body2R color={colors.black}>우선 알아보고 싶다면? </text.Body2R>
            <PrimaryTextButton press={goTabs} content="미리보기" level={1}/>
          </area.TextBackgroundBtnArea>

          <View style={{paddingBottom: bottom, backgroundColor:colors.white}}/>
        </View>
      </TouchableWithoutFeedback>
    );
}

