import React, {useState} from 'react';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as type from '../type';

type LineButtonProps={
  press: Function, 
  content : string, 
  color : string, 
  incolor:string, 
  outcolor:string
}

export default function LineButton({press, content, color, incolor, outcolor} : LineButtonProps): React.ReactElement{
  const[backgroundColor, setBackgroundColor]=useState('transparent');

  return(
    <button.LineButton 
      borderColor={color} 
      backgroundColor={backgroundColor}
      paddingH={12} 
      paddingV={4} 
      activeOpacity={1}
      onPress={ㅔress} 
      onPressIn={()=>setBackgroundColor(incolor)} 
      onPressOut={()=>setBackgroundColor(outcolor)}>
      <text.Button3 color={color}>{content}</text.Button3>
    </button.LineButton>
  );
}