import React from 'react';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// icons
import Icon from '../../assets/Icon';

// props & logic
import * as cal from '../../logics/non-server/Calculation';

type CommentButtonProps={
  commentNum: number,
}
export default function CommentButton({commentNum} : CommentButtonProps): React.ReactElement{
  return(
    <area.RowArea>
      <Icon icon="comment" size={20}/>
      <text.Body3 color={colors.primary}>{cal.numName(commentNum)}</text.Body3>
    </area.RowArea>
  );
}