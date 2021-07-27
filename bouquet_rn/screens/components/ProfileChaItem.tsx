import React, {Component, useState} from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';
import {useSetRecoilState, useRecoilValue} from 'recoil';

// components
import ConditionButton from './ConditionButton';
import { pickCharacter } from '../main/Profile/ProfileOverviewScreen';


export default function ProfileChaItem({name, introduction, idx} : {name: string, introduction : string, idx:number}){
  return(
    <button.MiniListButton height={238} color={colors.white} paddingH={18} paddingV={18} style={{alignItems:'center'}} activeOpacity={1}>
        <elses.Circle diameter={100}/>
        <text.Body2B color={colors.black}>{name}</text.Body2B>
        <text.Caption color={colors.black}>{introduction}</text.Caption>
        {/* <ConditionButton active={val===idx ? 1 : 0} press={setVal(idx)} content={val===idx ? "캐릭터 선택" : "선택된 캐릭터"}/> */}
    </button.MiniListButton>
  );
}