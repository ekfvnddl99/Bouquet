import React, {useState} from 'react';
// import {
//     TouchableOpacity
// } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

function conditionCase(level : number, content : string, color:string){
  if(level===1) return <text.Button2B color={color}>{content}</text.Button2B>;
  else if(level===2) return <text.Caption color={color}>{content}</text.Caption>;
  else return <text.Body2R color={color}>{content}</text.Body2R>;
}

export default function PrimaryTextButton({press, content, level} : {press: any, content : string, level: number}){
  const[color, setColor]=useState(colors.primary);
  return(
    <TouchableOpacity activeOpacity={1} onPress={press} onPressIn={()=>setColor(colors.pressed_primary)} onPressOut={()=>setColor(colors.primary)}>
      {conditionCase(level, content, color)}
    </TouchableOpacity>
  );
}