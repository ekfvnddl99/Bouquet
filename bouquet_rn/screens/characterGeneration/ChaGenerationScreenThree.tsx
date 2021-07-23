import React, {Component, useState} from 'react';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';

// icons
import EyeSvg from '../../assets/Eye';
import EyeFocusSvg from '../../assets/EyeFocus';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';


export default function ChaGenerationScreenThree({navigation} : ChaGenerationProps){
  const goNext=()=>{
    navigation.navigate("ChaGenerationFour");
  }

  return(
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="어떤 캐릭터인가요?" step={3}/>

        <input.FormInput height='44' placeholder='한 줄 소개 (필수)' onChangeText={()=>{}}/>
        <input.FormInput height='44' placeholder='좋아하는 것' onChangeText={()=>{}}/>
        <input.FormInput height='44' placeholder='싫어하는 것' onChangeText={()=>{}}/>
        <input.FormInput height='148' placeholder='이외에도 캐릭터에 대해서 자유롭게 알려 주세요!&#13;&#10;예시: 난 고민따위 하지 않는다' onChangeText={()=>{}}/>

        <area.BottomArea>
          <ConditionButton active={1} press={goNext} content="캐릭터 생성 완료"/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}