import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import i18n from 'i18n-js';
import {useNavigation} from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { viewBottom, viewTop } from './WelcomeScreen';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';
import GoogleSvg from '../../assets/Google';
import AppleSvg from '../../assets/Apple';

// props & logic
import type {WelcomeProps, WelcomeStackParam} from '../../utils/types/types'
import GoogleSignInAsync from '../../logics/GoogleLogin';
import AppleSignInAsync from '../../logics/server/AppleLogin';
import { EmailLoginAsync } from '../../logics/server/EmailLogin';
import useUser from '../../logics/useUser';

// components
import LoginButton from '../../components/button/loginButton';
import BackButton from '../../components/button/BackButton';
import ConditionButton from '../../components/button/ConditionButton';
import PrimaryTextButton from '../../components/button/PrimaryTextButton';
import WarningText from '../../components/text/WarningText';
import { StackNavigationProp } from '@react-navigation/stack';

function EyeSelect(eye : number){
  if(eye===1){
    return(<EyeSvg w='18' h='18'/>);
  }
  else{
    return(<EyeFocusSvg w='20' h='20'/>);
  }
}

export default function LoginScreen(){
    const[mail, setMail]=useState('456');
    const [password, setPassword] = useState('');
    const[err, setErr] = useState('');
    const[eye, setEye]=useState(1);
    const top=useRecoilValue(viewTop);
    const bottom = useRecoilValue(viewBottom);
    const navigation = useNavigation<StackNavigationProp<WelcomeStackParam>>();
    const [user, setUser] = useUser();

    const goTabs =()=>{
      navigation.replace("Tab");
    };

    const goRegister = () =>{
      navigation.navigate("Register");
    }

    const emailLogin = async () => {
      const errorMessage = await EmailLoginAsync(mail, password);
      setErr(errorMessage);
      if (!errorMessage) navigation.navigate("Tab");
    }

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, backgroundColor:colors.gray0, paddingTop:top}}>
          <area.ContainerBlank20>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
            <BackButton/>
            <View style={{marginTop:30}}/>
            <text.Subtitle1 color={colors.black}>{i18n.t('로그인')}</text.Subtitle1>
            <View style={{marginTop:32}}/>
            <input.FormInput height='44' placeholder={i18n.t('메일')} onChangeText={(mail)=>setMail(mail)} keyboardType='email-address'/>
            <area.FormArea height='44' style={{marginTop:16}}>
              <TextInput style={{flex: 1}} placeholder={i18n.t('비밀번호')} secureTextEntry={eye===1? true : false}
              onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity onPress={()=>{setEye(eye*(-1))}}>
                  {EyeSelect(eye)}
              </TouchableOpacity>
            </area.FormArea>

            <View style={{alignItems:'center'}}>
              {err ? <WarningText content={err} marginTop={16}/> : null}
              <View style={{marginTop:16}}>
                <ConditionButton active={true} press={emailLogin} content={i18n.t("로그인")} paddingH={40} paddingV={14} height={45}/>
              </View>
            </View>

            <area.TextBtnArea style={{marginTop:16}}>
              <text.Caption color={colors.black}>{i18n.t('비밀번호를 잊었나요')} </text.Caption>
              <PrimaryTextButton press={()=>{}} content={i18n.t("비밀번호 찾기")} level={2}/>
            </area.TextBtnArea>
            </ScrollView>

            <area.BottomArea style={{overflow:'hidden'}}>
              <LoginButton sentence={i18n.t('Google로 계속하기')} tag={<GoogleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
              <LoginButton sentence={i18n.t("Apple로 계속하기")} tag={<AppleSvg w='15' h='15'/>} press={()=>{}}/>

              <area.TextBtnArea style={{marginTop:15, overflow:'hidden'}}>
                <text.Body2R color={colors.black}>{i18n.t("계정이 없다면")} </text.Body2R>
                <PrimaryTextButton press={goRegister} content={i18n.t("회원가입")} level={1}/>
              </area.TextBtnArea>
            </area.BottomArea>



          </area.ContainerBlank20>

          <area.TextBackgroundBtnArea style={{overflow:'hidden'}}>
            <text.Body2R color={colors.black}>{i18n.t('우선 알아보고 싶다면')} </text.Body2R>
            <PrimaryTextButton press={goTabs} content={i18n.t("미리보기")} level={1}/>
            <View style={{height: 1}} />
          </area.TextBackgroundBtnArea>

          <View style={{paddingBottom: bottom, backgroundColor:colors.white}}/>
        </View>
      </TouchableWithoutFeedback>
    );
}

