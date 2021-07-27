import React from 'react';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

export default function BackgroundButton({press, content, height, active, paddingH, paddingV} : {press: any, content : string, height:number, active:number, paddingH:number, paddingV:number}){
  return(
    <button.BackgroundButton height={height} color={active===1 ? colors.primary : colors.gray1} paddingH={paddingH} paddingV={paddingV} onPress={press}>
      <text.Button3 color={active===1 ? colors.white : colors.gray5}>{content}</text.Button3>
    </button.BackgroundButton>
  );
}