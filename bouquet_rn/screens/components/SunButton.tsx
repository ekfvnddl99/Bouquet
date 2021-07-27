import React from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import SunSvg from '../../assets/Sun';
import SunFocusSvg from '../../assets/SunFocus';

function sunName(sun : number){
  let ans;
  if(sun>=1000){
      sun=sun/1000;
      ans = sun + 'K';
  }
  else ans=sun;
  return ans;
}

export default function SunButton({sun, active} : {sun : number, active:number}){
  return(
    <button.SunButton color={active===1 ? colors.primary : 'transparent'}>
      {active===1 ? <SunFocusSvg w='20' h='20'/> : <SunSvg w='20' h='20'/>}
      <text.Body3 color={active===1 ? colors.white : colors.primary} style={{marginLeft:4}}>{sunName(sun)}</text.Body3>
    </button.SunButton>
  );
}