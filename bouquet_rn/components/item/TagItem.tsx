import React from 'react';

// styles
import colors from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

/**
 * 해시태그처럼 tag 컴포넌트
 * 그냥 단순한 tag 그 자체. 배열로 표현되지 않는 tag.
 *
 * @param content 태그 내용
 * @param isActive 태그가 활성화 됐는지
 */
type TagItemProps = {
  content: string;
  isActive: boolean;
};
export default function TagItem({
  content,
  isActive,
}: TagItemProps): React.ReactElement {
  return (
    <elses.Tag
      backgroundColor={isActive ? colors.alpha10_primary : colors.gray2}
    >
      <text.Body3 textColor={isActive ? colors.primary : colors.gray6}>
        {content}
      </text.Body3>
    </elses.Tag>
  );
}
