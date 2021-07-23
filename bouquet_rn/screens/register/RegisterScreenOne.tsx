import React, {Component, useState} from 'react';
import {
    View,
    TextInput,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// props & logic
import type {RegisterProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';

function CheckForm(ch : number, setter : any){
  if(ch===1){
    return(
      <input.FormInput height='44' placeholder="메일 인증 번호" onChangeText={(num)=>setter(num)}/>
    );
  }
}


export default function RegisterScreenOne({navigation} : RegisterProps){
  const [ch, setCh] = useState(0);
  const [num, setNum] = useState('undefined');

  const goLogin=()=>{
    navigation.goBack();
  }

  const goNext=()=>{
    navigation.navigate("RegisterTwo");
  }
  return(
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="메일로 회원가입" step={1}/>

        <area.FormArea height='44'>
          <TextInput style={{flex: 1}} placeholder='메일'/>
          <button.BlackButton onPress={()=>setCh(1)}>
            <text.Button3 color={colors.black}>메일 인증</text.Button3>
          </button.BlackButton>
        </area.FormArea>
        
        {CheckForm(ch, setNum)}

        <area.BottomArea>
          <View style={{alignItems: 'center'}}>
            <text.Caption color={colors.gray6}>이전 페이지로 돌아가면 소셜 계정으로도 가입할 수 있어요!</text.Caption>
          </View>

          <ConditionButton active={1} press={goNext} content="메일로 계속하기"/>

          <area.TextBtnArea>
              <text.Body2R color={colors.black}>계정이 이미 있다면? </text.Body2R>
              <PrimaryTextButton press={goLogin} content="로그인" level={3}/>
          </area.TextBtnArea>

        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}