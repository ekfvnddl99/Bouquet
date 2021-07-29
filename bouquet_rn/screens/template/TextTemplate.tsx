import React from 'react';
import {View} from 'react-native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

export default function TextTemplate(){
  return(
    <area.NoHeightArea marBottom={12} paddingH={20} paddingV={20} style={{paddingHorizontal:20, paddingVertical:20}}>
      <text.Body2R color={colors.black}>이건 내용이라구용가릿!</text.Body2R>
    </area.NoHeightArea>
  );
}