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

export default function SettingProfileScreen(){
  const[err, setErr] = useState(1);
  const[byte, setByte]=useState(0);
  const[nickname, setNickname]=useState('');

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <area.Container>
      <area.ContainerBlank20>
        <text.Subtitle1 color={colors.black} style={{marginBottom:32}}>계정 프로필 수정</text.Subtitle1>

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
          <TouchableOpacity style={{alignItems:'center'}}>
            <text.Button3 color={colors.warning_red}>계정 삭제</text.Button3>
          </TouchableOpacity>
          <ConditionButton active={1} press={()=>{}} content="계정 프로필 수정 완료" paddingH={0} paddingV={14} height={45}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
    </TouchableWithoutFeedback>
  );
}