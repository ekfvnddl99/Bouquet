import React, {useState} from 'react';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

interface LineButtonProps{
  press: any, 
  content : string, 
  color : string, 
  incolor:string, 
  outcolor:string
}

export default function LineButton({press, content, color, incolor, outcolor} : LineButtonProps){
  const[bgcolor, setBgColor]=useState('transparent');
  return(
    <button.LineButton color={color} paddingH={12} paddingV={4} activeOpacity={1}
    onPress={press} onPressIn={()=>setBgColor(incolor)} onPressOut={()=>setBgColor(outcolor)} 
    style={{backgroundColor:bgcolor}}>
      <text.Button3 color={color}>{content}</text.Button3>
    </button.LineButton>
  );
}