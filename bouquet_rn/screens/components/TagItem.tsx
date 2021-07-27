import React from 'react';
import { colors } from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

export default function TagItem({content} : {content:string}){
    return(
      <elses.Tag color={colors.alpha10_primary}>
        <text.Body3 color={colors.primary}>{content}</text.Body3>
      </elses.Tag>  
    );
}