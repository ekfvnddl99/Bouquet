import React, {useState} from 'react';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as type from '../type';

type BackgroundButtonProps={
  press: Function, 
  content: string, 
  height: number, 
  isActive: boolean, 
  paddingH: number, 
  paddingV: number,
}
export default function BackgroundButton({press, content, height, isActive, paddingH, paddingV} : BackgroundButtonProps) : React.ReactElement{
  const[backgroundColor, setBackgroundColor]=useState(colors.primary);
  
  return(
    <button.BackgroundButton 
      height={height} 
      backgroundColor={isActive ? backgroundColor : colors.gray1} 
      paddingH={paddingH} 
      paddingV={paddingV} 
      activeOpacity={1}
      onPress={press} 
      onPressIn={ ()=>isActive ? setBackgroundColor(colors.pressed_primary) : null } 
      onPressOut={ ()=>isActive ? setBackgroundColor(colors.primary) : null }>
      <text.Button3 color={isActive ? colors.white : colors.gray5}>{content}</text.Button3>
    </button.BackgroundButton>
  );
}