import React from 'react';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';

type CommentButtonProps = {
  commentNum: number;
};
/**
 * 아 버튼은 아니고 그냥 (댓글 아이콘, 댓글 개수) 컴포넌트
 * 나중에... 버튼에 생길 수도 있지 않을꽈....
 *
 * @param commentNum 댓글 개수
 */
export default function CommentButton({
  commentNum,
}: CommentButtonProps): React.ReactElement {
  return (
    <area.RowArea>
      <Svg icon="comment" size={20} />
      <text.Body3 textColor={colors.primary}>
        {cal.numName(commentNum)}
      </text.Body3>
    </area.RowArea>
  );
}
