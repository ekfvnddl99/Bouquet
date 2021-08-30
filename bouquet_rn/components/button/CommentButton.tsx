import React from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// icons
import CommentSvg from '../../assets/Comment';

// props & logic
import * as cal from '../../logics/non-server/Calculation';

export default function CommentButton({comment} : {comment : number}){
  return(
    <area.RowArea>
      <CommentSvg w='20' h='20'/>
      <text.Body3 color={colors.primary}>{cal.numName(comment)}</text.Body3>
    </area.RowArea>
  );
}