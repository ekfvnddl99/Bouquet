import React, {Component, useState} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
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

function CheckForm(ch : number, setter : any){
  if(ch===1){
    return(
      <View style={{marginTop:16}}>
        <ConditionTextInput height={44} placeholder="메일 인증 번호" onChange={setter} keyboard={'numeric'} active={1}/>
        <WarningText content="무야호" marginTop={8}/>
      </View>
    );
  }
}


export default function RegisterScreenOne({onChange, navigation, setEmail} : {onChange : any, navigation : any, setEmail : Function}){
  const [ch, setCh] = useState(0);
  const [err, setErr] = useState(1);
  const [num, setNum] = useState('undefined');

  const goBack=()=>{
    navigation.navigate("Login");
  }

  return(
    <area.ContainerBlank20>
      <area.FormArea height='44' style={err===1 ? {borderWidth:1, borderColor:colors.warning_red} : null}>
        <TextInput style={{flex: 1}} placeholder='메일' keyboardType='email-address' onChangeText={text => setEmail(text)} />
        <LineButton press={()=>setCh(1)} content="메일 인증" color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
      </area.FormArea>
      <WarningText content="무야호" marginTop={8}/>
        
      {CheckForm(ch, setNum)}
      
      <area.BottomArea>
        <View style={{alignItems: 'center'}}>
          <text.Caption color={colors.gray6}>이전 페이지로 돌아가면 소셜 계정으로도 가입할 수 있어요!</text.Caption>
        </View>

        <View style={{marginVertical:16}}>
          <ConditionButton active={1} press={onChange} content="메일로 계속하기" paddingH={0} paddingV={14} height={45}/>
        </View>

        <area.TextBtnArea style={{marginBottom:16}}>
          <text.Body2R color={colors.black}>계정이 이미 있다면? </text.Body2R>
          <PrimaryTextButton press={goBack} content="로그인" level={3}/>
        </area.TextBtnArea>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
