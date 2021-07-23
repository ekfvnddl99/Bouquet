import React from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// icons
import CommentSvg from '../../assets/Comment';


function commentName(sun : number){
  let ans;
  if(sun>=1000){
      sun=sun/1000;
      ans = sun + 'K';
  }
  else ans=sun;
  return ans;
}

export default function CommentButton({comment} : {comment : number}){
  return(
    <area.RowArea top={0}>
      <CommentSvg w='20' h='20'/>
      <text.Body3 color={colors.primary}>{commentName(comment)}</text.Body3>
    </area.RowArea>
  );
}