import React, {Component, useState} from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';

export default function ChaGenerationScreenOne({modify, onChange} : {modify : number, onChange:any}){

  return(
    <area.ContainerBlank20>
      <area.BottomArea style={{marginBottom:16}}>
        <ConditionButton height={44} active={1} press={onChange} content={modify===1 ? "기본 정보 수정" : "기본 정보 입력"} paddingH={0} paddingV={14}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}