import React from 'react';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

export default function ConditionButton({active, press, content, paddingH, paddingV} : {active : number, press: any, content : string, paddingH:number, paddingV:number}){
  return(
    <button.LineButton onPress={press} height={45} color={active===1 ? colors.primary : colors.gray2} paddingH={paddingH} paddingV={paddingV}>
      <text.Button2B color={active===1 ? colors.primary : colors.gray5}>{content}</text.Button2B>
    </button.LineButton>
  );
}