import React from 'react';

// assets
import Svg from '../../assets/Icon';

// styles
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

/**
 * 조건을 보여 주고 조건의 충족 여부를 표시하는 컴포넌트
 * 회원가입, 캐릭터 생성 등 input 형태에 조건이 있는 경우 사용
 *
 * @param content 조건 텍스트
 * @param active 조건을 충족했는지 여부를 나타냄 (true면 충족)
 */
export default function ConditionText({
  content,
  active,
}: {
  content: string;
  active: boolean;
}): React.ReactElement {
  return (
    <area.RowArea style={{ marginTop: 8 }}>
      {active === true ? (
        <Svg icon="checkFocus" size={15} />
      ) : (
        <Svg icon="check" size={15} />
      )}
      <text.Caption color={active === true ? colors.primary : colors.gray6}>
        {content}
      </text.Caption>
    </area.RowArea>
  );
}
