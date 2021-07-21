import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
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

export default function RegisterScreenThree({navigation} : RegisterProps){

  const goNext=()=>{
    navigation.navigate("RegisterFour");
  }

  return(
    <area.Container>
      <area.ContainerBlank>
        <ProgressArea navigation={navigation} title="계정 정보 입력" step={3}/>

        <View style={{alignItems:'center', marginVertical:16}}>
          <elses.Circle>
            <GallerySvg w='24' h='24'/>
          </elses.Circle>
        </View>

        <input.FormInput placeholder="별명"/>
        <ConditionText condition=" 8글자 이상, 32글자 이하" active={0}/>
        <ConditionText condition=" 특수문자는 _(언더바), -(하이픈)만 사용" active={0}/>
        <ConditionText condition=" 중복되지 않는 별명" active={0}/>

        <area.BottomArea>
          <area.TextBtnArea>
            <TouchableOpacity>
                <text.PrimaryText>서비스 이용 약관</text.PrimaryText>
            </TouchableOpacity>
            <text.SubGrayText>,</text.SubGrayText>
            <TouchableOpacity>
                <text.PrimaryText>개인정보 취급 방침</text.PrimaryText>
            </TouchableOpacity>
            <text.SubGrayText>에 모두 동의하시나요?</text.SubGrayText>
          </area.TextBtnArea>
          <button.GrayBtnButton onPress={goNext}>
            <text.GrayBtnText>필수 약관 동의 & 가입 완료</text.GrayBtnText>
          </button.GrayBtnButton>
        </area.BottomArea>
      </area.ContainerBlank>
    </area.Container>
  );
}