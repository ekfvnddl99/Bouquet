import React, {useState} from 'react';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

export default function ConditionButton({active, press, content, paddingH, paddingV, height} : {active : number, press: any, content : string, paddingH:number, paddingV:number, height:number}){
  const[color, setColor]=useState('transparent');
  return(
    <button.LineButton onPress={press} height={height} color={active===1 ? colors.primary : colors.gray2} paddingH={paddingH} paddingV={paddingV} activeOpacity={1}
    onPressIn={()=>active===1 ? setColor(colors.alpha20_primary) : null} onPressOut={()=>active===1 ? setColor('transparent') : null} style={{backgroundColor:color}}>
      {height===45 ? <text.Button2B color={active===1 ? colors.primary : colors.gray5}>{content}</text.Button2B>
      : <text.Button3 color={active===1 ? colors.primary : colors.gray5}>{content}</text.Button3>}
    </button.LineButton>
  );
}