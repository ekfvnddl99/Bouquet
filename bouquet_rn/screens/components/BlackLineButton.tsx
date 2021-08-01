import React, {useState} from 'react';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

export default function BlackLineButton({press, content} : {press: any, content : string}){
  const[color, setColor]=useState('transparent');
  return(
    <button.LineButton color={colors.black} height={22} paddingH={12} paddingV={4} activeOpacity={1}
    onPress={press} onPressIn={()=>setColor(colors.gray2)} onPressOut={()=>setColor('transparent')}
    style={{backgroundColor:color}}>
      <text.Button3 color={colors.black}>{content}</text.Button3>
    </button.LineButton>
  );
}