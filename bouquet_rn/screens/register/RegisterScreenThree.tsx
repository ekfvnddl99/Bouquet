import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
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
import {getByte} from '../logics/Calculation';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import ConditionTextInput from '../components/ConditionTextInput';
import WarningText from '../components/WarningText';

export default function RegisterScreenThree({navigation} : RegisterProps){
  const[err, setErr] = useState(1);
  const[byte, setByte]=useState(0);
  const[nickname, setNickname]=useState('');

  const goNext=()=>{
    navigation.navigate("RegisterFour");
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="계정 정보 입력" step={3} intro={null}/>

        <View style={{alignItems:'center', marginBottom:32}}>
          <TouchableOpacity>
            <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')}/>
            {/* <elses.Circle diameter={120}>
              <GallerySvg w='24' h='24'/>
            </elses.Circle> */}
          </TouchableOpacity>
        </View>

        <ConditionTextInput height={44} placeholder="별명" onChange={setNickname} keyboard={'default'} active={1}/>
        <area.RowArea style={{marginTop:8}}>
          <View style={{flex:1}}>{err===1 ? <WarningText content="무야호" marginTop={0}/> : null}</View>
          <text.Caption color={colors.gray6}>{getByte(nickname)} / 20 byte</text.Caption>
        </area.RowArea>
        <ConditionText content=" 20 byte 이하" active={0}/>
        <ConditionText content=" 중복되지 않는 별명" active={0}/>

        <area.BottomArea style={{marginBottom:16}}>
          <area.TextBtnArea style={{marginBottom:16}}>
            <PrimaryTextButton press={()=>{}} content="서비스 이용 약관" level={2}/>
            <text.Caption color={colors.gray6}>, </text.Caption>
            <PrimaryTextButton press={()=>{}} content="개인정보 취급 방침" level={2}/>
            <text.Caption color={colors.gray6}>에 모두 동의하시나요?</text.Caption>
          </area.TextBtnArea>
          <ConditionButton active={1} press={goNext} content="필수 약관 동의 & 가입 완료" paddingH={0} paddingV={14} height={45}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
    </TouchableWithoutFeedback>
  );
}