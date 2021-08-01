import React, {useState} from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import SunSvg from '../../assets/Sun';
import SunFocusSvg from '../../assets/SunFocus';

// props & logic
import * as cal from '../logics/Calculation';

export default function SunButton({sun} : {sun : number,}){
  const[activation, setActivation]=useState(-1);
  const[color0, setColor0]=useState('transparent');
  const[color1, setColor1]=useState(colors.primary);
  return(
    <button.SunButton activeOpacity={1} onPress={()=>setActivation(activation*(-1))}
    color={activation===1 ? color1 : color0}
    onPressIn={()=>setColor0(colors.alpha20_primary)}
    onPressOut={()=>[setActivation(activation*(-1)), setColor0('transparent')]}>
      {activation===1 ? <SunFocusSvg w='20' h='20'/> : <SunSvg w='20' h='20'/>}
      <text.Body3 color={activation===1 ? colors.white : colors.primary} style={{marginLeft:4}}>{cal.numName(sun)}</text.Body3>
    </button.SunButton>
  );
}