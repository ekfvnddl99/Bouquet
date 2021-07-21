import React, {Component, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// props & logic
import type {RegisterProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';

function CheckForm(ch : number, setter : any){
  if(ch===1){
    return(
      <input.FormInput placeholder="메일 인증 번호" onChangeText={(num)=>setter(num)}/>
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
      <area.ContainerBlank>
        <ProgressArea navigation={navigation} title="메일로 회원가입" step={1}/>

        <area.FormArea>
          <TextInput style={{flex: 1}} placeholder='메일'/>
          <button.BlackButton onPress={()=>setCh(1)}>
            <Text>메일 인증</Text>
          </button.BlackButton>
        </area.FormArea>
        
        {CheckForm(ch, setNum)}

        <area.BottomArea>
          <View style={{alignItems: 'center'}}>
            <text.SubGrayText>이전 페이지로 돌아가면 소셜 계정으로도 가입할 수 있어요!</text.SubGrayText>
          </View>

          <button.GrayBtnButton onPress={goNext}>
            <text.GrayBtnText>메일로 계속하기</text.GrayBtnText>
          </button.GrayBtnButton>

          <area.TextBtnArea>
              <text.SubBlackText>계정이 이미 있다면? </text.SubBlackText>
              <TouchableOpacity onPress={goLogin}>
                  <text.PrimaryText>로그인</text.PrimaryText>
              </TouchableOpacity>
          </area.TextBtnArea>

        </area.BottomArea>
      </area.ContainerBlank>
    </area.Container>
  );
}