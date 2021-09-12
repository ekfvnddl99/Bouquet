import React from 'react';

// styles
import colors from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

type TagItemProps = {
  content: string;
  isActive: boolean;
  isMini: boolean;
};
/**
 * 해시태그처럼 tag 컴포넌트
 * @description 그냥 단순한 tag 그 자체. 배열로 표현되지 않는 tag.
 *
 * @param content 태그 내용
 * @param isActive 태그가 활성화 됐는지
 * @param isMini 긴 태그 내용을 줄여야 하는가
 */
export default function TagItem({
  content,
  isActive,
  isMini,
}: TagItemProps): React.ReactElement {
  return (
    <elses.Tag
      backgroundColor={isActive ? colors.alpha10_primary : colors.gray2}
    >
      <text.Body3
        textColor={isActive ? colors.primary : colors.gray6}
        numberOfLines={isMini ? 1 : undefined}
      >
        {content}
      </text.Body3>
    </elses.Tag>
  );
}
