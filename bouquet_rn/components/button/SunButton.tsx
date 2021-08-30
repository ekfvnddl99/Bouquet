import React, {useState} from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import SunSvg from '../../assets/Sun';
import SunFocusSvg from '../../assets/SunFocus';

// props & logic
import * as cal from '../../logics/non-server/Calculation';

export default function SunButton({sun, active} : {sun : number, active:boolean}){
  const[activation, setActivation]=useState(active);
  const[color0, setColor0]=useState('transparent');
  const[color1, setColor1]=useState(colors.primary);
  const[sunNum, setSunNum]=useState(sun)
  return(
    <button.SunButton activeOpacity={1} onPress={()=>setActivation(!activation)}
    color={activation ? color1 : color0}
    onPressIn={()=>setColor0(colors.alpha20_primary)}
    onPressOut={()=>[setActivation(!activation), setColor0('transparent'), activation ? setSunNum(sunNum-1) : setSunNum(sunNum+1)]}>
      {activation ? <SunFocusSvg w='20' h='20'/> : <SunSvg w='20' h='20'/>}
      <text.Body3 color={activation ? colors.white : colors.primary} style={{marginLeft:4}}>{cal.numName(sunNum)}</text.Body3>
    </button.SunButton>
  );
}