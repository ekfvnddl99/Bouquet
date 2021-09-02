import React, {useState} from 'react';
import {
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as type from '../type';

function conditionCase(level : number, content : string, color:string){
  if(level===1) return <text.Button2B color={color}>{content}</text.Button2B>;
  if(level===2) return <text.Caption color={color}>{content}</text.Caption>;
  return <text.Body2R color={color}>{content}</text.Body2R>;
}

type PrimaryTextButtonProps={
  press: Function, 
  content: string, 
  level: number
}
export default function PrimaryTextButton({press, content, level} : PrimaryTextButtonProps): React.ReactElement{
  const[textColor, setTextColor]=useState(colors.primary);
  
  return(
    <TouchableOpacity 
      activeOpacity={1} 
      onPress={press} 
      onPressIn={()=>setTextColor(colors.pressed_primary)} 
      onPressOut={()=>setTextColor(colors.primary)}>
      {conditionCase(level, content, textColor)}
    </TouchableOpacity>
  );
}