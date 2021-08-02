import React, {useState} from 'react';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

export default function BackgroundButton({press, content, height, active, paddingH, paddingV} : {press: any, content : string, height:number, active:number, paddingH:number, paddingV:number}){
  const[color, setColor]=useState(colors.primary);
  return(
    <button.BackgroundButton 
    height={height} color={active===1 ? color : colors.gray1} paddingH={paddingH} paddingV={paddingV} activeOpacity={1}
    onPress={press} 
    onPressIn={()=>active===1 ? setColor(colors.pressed_primary) : null} 
    onPressOut={()=>active===1 ? setColor(colors.primary) : null}>
      <text.Button3 color={active===1 ? colors.white : colors.gray5}>{content}</text.Button3>
    </button.BackgroundButton>
  );
}