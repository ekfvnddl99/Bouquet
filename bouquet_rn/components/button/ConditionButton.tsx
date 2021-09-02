import React, {useState} from 'react';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as type from '../type';

type ConditionButtonProps={
  isActive : boolean, 
  press: Function, 
  content : string, 
  paddingH:number, 
  paddingV:number, 
  height:number
}
export default function ConditionButton({isActive, press, content, paddingH, paddingV, height} : ConditionButtonProps): React.ReactElement{
  const[backgroundColor, setBackgroundColor]=useState('transparent');
  return(
    <button.ConditionButton 
      onPress={press} 
      height={height} 
      backgroundColor={backgroundColor}
      borderColor={isActive ? colors.primary : colors.gray2} 
      paddingH={paddingH} 
      paddingV={paddingV} 
      activeOpacity={1}
      onPressIn={()=>isActive ? setBackgroundColor(colors.alpha20_primary) : null} 
      onPressOut={()=>isActive ? setBackgroundColor('transparent') : null}>
      {height===45 ? 
      <text.Button2B color={isActive ? colors.primary : colors.gray5}>{content}</text.Button2B>
      : <text.Button3 color={isActive ? colors.primary : colors.gray5}>{content}</text.Button3>}
    </button.ConditionButton>
  );
}