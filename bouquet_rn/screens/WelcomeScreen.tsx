import * as React from 'react';
import { 
  TouchableOpacity, 
  View, 
} from 'react-native';
import * as area from '../styles/styled-components/area';
import * as text from '../styles/styled-components/text';

// icons
import LogoSvg from '../assets/Logo';
import MailSvg from '../assets/Mail';
import AppleSvg from '../assets/Apple';
import GoogleSvg from '../assets/Google';
import TitleSvg from '../assets/Title';

// props & logic
import type {WelcomeProps} from '../utils/types';
import GoogleSignInAsync  from './logics/GoogleLogin';

// components
import LoginButton from './components/LoginButton';

export default function WelcomeScreen({navigation} : WelcomeProps) {

  const goTabs =()=>{
    navigation.navigate("Tab");
  };

  // 이렇게 함수를 만들어줘야 welcome 나오고 버튼 눌렀을 때 login이 나온다.
  const goLogin = ()=>{
    navigation.navigate("Login");
  }

  const goRegister = ()=>{
    navigation.navigate("Register");
  }

  return(
    <area.Container>
      <area.ContainerBlank>
        <View style={{alignItems:'center', marginTop: 70}}>
            <LogoSvg w='100' h='100'/>
        </View>
        <View style={{alignItems:'center', marginTop: 15}}>
            <TitleSvg w='170' h='54'/>
        </View>

        <area.BottomArea>
            <LoginButton sentence="메일로 가입하기" tag={<MailSvg w='15' h='15'/>} press={goRegister}/>
            <LoginButton sentence="Google로 계속하기" tag={<GoogleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
            <LoginButton sentence="Apple로 계속하기" tag={<AppleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
        </area.BottomArea>

        <area.TextBtnArea>
            <text.SubBlackText>또는 </text.SubBlackText>
            <TouchableOpacity onPress={goLogin}>
                <text.PrimaryText>로그인</text.PrimaryText>
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