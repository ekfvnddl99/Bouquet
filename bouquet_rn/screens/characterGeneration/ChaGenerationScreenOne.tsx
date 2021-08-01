import React, {Component, useState} from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';

export default function ChaGenerationScreenOne({navigation} : ChaGenerationProps){
  const goNext=()=>{
    navigation.navigate("ChaGenerationTwo");
  }

  return(
    <area.Container>
      <area.ContainerBlank20>
        <ProgressArea navigation={navigation} title="어떤 모습인가요?" step={1} intro="이 캐릭터의 겉모습을 생각해 보아요."/>

        <area.BottomArea style={{marginBottom:16}}>
          <ConditionButton height={44} active={1} press={goNext} content="기본 정보 입력" paddingH={0} paddingV={14}/>
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}