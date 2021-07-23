import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import * as elses from '../../styles/styled-components/elses';

// icons
import GallerySvg from '../../assets/Gallery';

// props & logic
import type {RegisterProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';

export default function RegisterScreenThree({navigation} : RegisterProps){

  const goNext=()=>{
    navigation.navigate("RegisterFour");
  }

  return(
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="계정 정보 입력" step={3}/>

        <View style={{alignItems:'center', marginVertical:16}}>
          <TouchableOpacity>
            <elses.Circle radius={120} vertical={16}>
              <GallerySvg w='24' h='24'/>
            </elses.Circle>
          </TouchableOpacity>
        </View>

        <input.FormInput height='44' placeholder="별명"/>
        <ConditionText condition=" 8글자 이상, 32글자 이하" active={0}/>
        <ConditionText condition=" 특수문자는 _(언더바), -(하이픈)만 사용" active={0}/>
        <ConditionText condition=" 중복되지 않는 별명" active={0}/>

        <area.BottomArea>
          <area.TextBtnArea>
            <PrimaryTextButton press={()=>{}} content="서비스 이용 약관" level={2}/>
            <text.Caption color={colors.gray6}>,</text.Caption>
            <PrimaryTextButton press={()=>{}} content="개인정보 취급 방침" level={2}/>
            <text.Caption color={colors.gray6}>에 모두 동의하시나요?</text.Caption>
          </area.TextBtnArea>
          <ConditionButton active={1} press={goNext} content="필수 약관 동의 & 가입 완료"/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}