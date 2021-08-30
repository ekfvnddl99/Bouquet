import React, {useState} from 'react';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

type ConditionProps={active : boolean, press: any, content : string, paddingH:number, paddingV:number, height:number}
export default function ConditionButton({active, press, content, paddingH, paddingV, height} : ConditionProps){
  const[color, setColor]=useState('transparent');
  return(
    <button.ConditionButton onPress={press} height={height} color={active===true ? colors.primary : colors.gray2} paddingH={paddingH} paddingV={paddingV} activeOpacity={1}
    onPressIn={()=>active===true ? setColor(colors.alpha20_primary) : null} onPressOut={()=>active===true ? setColor('transparent') : null} style={{backgroundColor:color}}>
      {height===45 ? <text.Button2B color={active===true ? colors.primary : colors.gray5}>{content}</text.Button2B>
      : <text.Button3 color={active===true ? colors.primary : colors.gray5}>{content}</text.Button3>}
    </button.ConditionButton>
  );
}