import React from 'react';
import {View} from 'react-native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

// components
import ConditionButton from './ConditionButton';

export default function SelectTemplateItem(){
  return(
    <View style={{marginBottom:24}}>
      <area.RowArea>
        <View><text.Subtitle3 color={colors.black} style={{marginBottom:12}}></text.Subtitle3></View>
        <ConditionButton active={1} press={()=>{}} height={22} paddingH={12} paddingV={4} content="선택"/>
      </area.RowArea>
      <text.Caption color={colors.gray6} style={{marginBottom:12}}></text.Caption>
    </View>
  );
}