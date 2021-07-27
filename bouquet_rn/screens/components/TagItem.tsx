import React from 'react';
import { colors } from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

export default function TagItem({content, active} : {content:string, active:number}){
    return(
      <elses.Tag color={active===1 ? colors.alpha10_primary : colors.gray2}>
        <text.Body3 color={active===1 ? colors.primary : colors.gray6}>{content}</text.Body3>
      </elses.Tag>  
    );
}