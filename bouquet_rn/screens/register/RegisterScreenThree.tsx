import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import * as elses from '../../styles/styled-components/elses';

// icons
import GallerySvg from '../../assets/Gallery';

// props & logic
import {getByte} from '../logics/Calculation';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionText from '../components/ConditionText';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import ConditionTextInput from '../components/ConditionTextInput';
import WarningText from '../components/WarningText';

export default function RegisterScreenThree({onChange, name, setName, setProfilePic} : {onChange : any, name: string, setName: Function, setProfilePic: Function}){
  const[err, setErr] = useState(1);
  const[en, setEn]=useState(0);

  return(
    <area.ContainerBlank20>
      <View style={{alignItems:'center', marginBottom:32}}>
        <TouchableOpacity>
          <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')}/>
          {/* <elses.Circle diameter={120}>
            <GallerySvg w='24' h='24'/>
          </elses.Circle> */}
        </TouchableOpacity>
      </View>

      <ConditionTextInput height={44} placeholder={i18n.t("별명")} onChange={setName} keyboard={'default'} active={1}/>
      <area.RowArea style={{marginTop:8}}>
        <View style={{flex:1}}>{err===1 ? <WarningText content="무야호" marginTop={0}/> : null}</View>
        <text.Caption color={colors.gray6}>{getByte(name)} / 20 byte</text.Caption>
      </area.RowArea>
      <ConditionText content={i18n.t("20 byte 이하")} active={0}/>
      <ConditionText content={i18n.t("중복되지 않는 이름")} active={0}/>

      <area.BottomArea style={{marginBottom:16}}>
        <area.TextBtnArea style={{marginBottom:16}}>
          {i18n.locale==='en' ? <text.Caption color={colors.gray6}>{i18n.t('에 모두 동의하시나요')} </text.Caption> : null}
          <PrimaryTextButton press={()=>{}} content={i18n.t("서비스 이용 약관")} level={2}/>
          <text.Caption color={colors.gray6}>, </text.Caption>
          <PrimaryTextButton press={()=>{}} content={i18n.t("개인정보 취급 방침")} level={2}/>
          {i18n.locale==='ko' ? <text.Caption color={colors.gray6}>{i18n.t('에 모두 동의하시나요')}</text.Caption> :null}
        </area.TextBtnArea>
        <ConditionButton active={1} press={onChange} content={i18n.t("필수 약관 동의 & 가입 완료")} paddingH={0} paddingV={14} height={45}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}