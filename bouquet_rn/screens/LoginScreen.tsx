import React, {Component, useState} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
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

// components
import LoginButton from './components/LoginButton';
import BackButton from './components/BackButton';
import ConditionButton from './components/ConditionButton';
import PrimaryTextButton from './components/PrimaryTextButton';

function CheckErr(mail:string){
  if(mail==='456') return '메일이나 비밀번호가 틀렸나 봐요.';
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
    const[eye, setEye]=useState(1);

    const goTabs =()=>{
      navigation.replace("Tab");
    };

    const goRegister = () =>{
      navigation.navigate("Register");
    }

    return(
    <area.Container>
      <area.ContainerBlank20>
        <BackButton navigation={navigation}/>

        <text.Subtitle1 color={colors.black}>로그인</text.Subtitle1>

        <input.FormInput height='44' placeholder='메일' onChangeText={(mail)=>setMail(mail)}/>
        <area.FormArea height='44'>
          <TextInput style={{flex: 1}} placeholder='비밀번호'/>
          <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
              {EyeSelect(eye)}
          </TouchableOpacity>
        </area.FormArea>

        <View style={{alignItems:'center'}}>
          <View><text.Caption color={colors.primary}>{CheckErr(mail)}</text.Caption></View>

          <ConditionButton active={1} press={()=>{}} content="로그인"/>
        </View>

        <area.TextBtnArea>
          <text.Caption color={colors.black}>비밀번호를 잊었나요? </text.Caption>
          <PrimaryTextButton press={()=>{}} content="계정 찾기" level={2}/>
        </area.TextBtnArea>

        <area.BottomArea>
          <LoginButton sentence="Google로 계속하기" tag={<GoogleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
          <LoginButton sentence="Apple로 계속하기" tag={<AppleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
        </area.BottomArea>

        <area.TextBtnArea>
          <text.Body2R color={colors.black}>계정이 없다면? </text.Body2R>
          <PrimaryTextButton press={goRegister} content="회원가입" level={1}/>
        </area.TextBtnArea>

      </area.ContainerBlank20>

      <area.TextBackgroundBtnArea>
        <text.Body2R color={colors.black}>우선 알아보고 싶다면? </text.Body2R>
        <PrimaryTextButton press={goTabs} content="미리보기" level={1}/>
      </area.TextBackgroundBtnArea>
    </area.Container>
    );
}