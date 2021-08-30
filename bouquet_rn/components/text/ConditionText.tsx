import React from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// icons
import CheckSvg from '../../assets/Check';
import CheckFocusSvg from '../../assets/CheckFocus';

export default function ConditionText({content, active} : {content : string, active : boolean}){
  return(
    <area.RowArea style={{marginTop:8}}>
      {active===true ? <CheckFocusSvg w='15' h='15'/> : <CheckSvg w='15' h='15'/>}
      <text.Caption color={active===true ? colors.primary : colors.gray6}> {content}</text.Caption>
    </area.RowArea>
  );
}