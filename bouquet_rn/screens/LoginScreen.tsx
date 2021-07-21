import React, {Component, useState} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import * as area from '../styles/styled-components/area';
import * as button from '../styles/styled-components/button';
import * as text from '../styles/styled-components/text';
import * as input from '../styles/styled-components/input';

// icons
import EyeSvg from '../assets/Eye';
import EyeFocusSvg from '../assets/EyeFocus';
import GoogleSvg from '../assets/Google';
import AppleSvg from '../assets/Apple';

// props & logic
import type {LoginProps} from '../utils/types'
import GoogleSignInAsync from './logics/GoogleLogin';

// components
import LoginButton from './components/LoginButton';
import BackButton from './components/BackButton';

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

export default function LoginScreen({navigation} : LoginProps){
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
      <area.ContainerBlank>
        <BackButton navigation={navigation}/>

        <text.TitleText>로그인</text.TitleText>

        <input.FormInput placeholder='메일' onChangeText={(mail)=>setMail(mail)}/>
        <area.FormArea>
          <TextInput style={{flex: 1}} placeholder='비밀번호'/>
          <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
              {EyeSelect(eye)}
          </TouchableOpacity>
        </area.FormArea>

        <View style={{alignItems:'center'}}>
          <View><text.ErrText>{CheckErr(mail)}</text.ErrText></View>

          <button.PrimaryButton>
              <text.PrimaryText>로그인</text.PrimaryText>
          </button.PrimaryButton>
        </View>

        <area.TextBtnArea>
          <text.SubBlackText>비밀번호를 잊었나요? </text.SubBlackText>
          <TouchableOpacity>
              <text.PrimaryText>계정 찾기</text.PrimaryText>
          </TouchableOpacity>
        </area.TextBtnArea>

      <area.BottomArea>
          <LoginButton sentence="Google로 계속하기" tag={<GoogleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
          <LoginButton sentence="Apple로 계속하기" tag={<AppleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
      </area.BottomArea>

      <area.TextBtnArea>
          <text.SubBlackText>계정이 없다면? </text.SubBlackText>
          <TouchableOpacity onPress={goRegister}>
              <text.PrimaryText>회원가입</text.PrimaryText>
          </TouchableOpacity>
      </area.TextBtnArea>
      </area.ContainerBlank>

      <area.TextBackgroundBtnArea>
          <text.SubBlackText>우선 알아보고 싶다면? </text.SubBlackText>
          <TouchableOpacity onPress={goTabs}>
              <text.PrimaryText>미리보기</text.PrimaryText>
          </TouchableOpacity>
      </area.TextBackgroundBtnArea>
    </area.Container>
    );
}