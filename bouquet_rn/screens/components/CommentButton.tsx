import React from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// icons
import CommentSvg from '../../assets/Comment';


function commentName(comment : number){
  let ans;
  if(comment>=1000){
    comment/=1000;
    ans = comment + 'K';
  }
  else ans=comment;
  return ans;
}

export default function CommentButton({comment} : {comment : number}){
  return(
    <area.RowArea>
      <CommentSvg w='20' h='20'/>
      <text.Body3 color={colors.primary}>{commentName(comment)}</text.Body3>
    </area.RowArea>
  );
}