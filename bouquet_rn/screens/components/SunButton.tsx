import React from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import SunSvg from '../../assets/Sun';


function sunName(sun : number){
  let ans;
  if(sun>=1000){
      sun=sun/1000;
      ans = sun + 'K';
  }
  else ans=sun;
  return ans;
}

export default function SunButton({sun} : {sun : number}){
  return(
    <button.SunButton>
      <SunSvg w='20' h='20'/>
      <text.Body3 color={colors.primary}>{sunName(sun)}</text.Body3>
    </button.SunButton>
  );
}