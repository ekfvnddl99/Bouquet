import React, { useState } from 'react';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

/**
 * 조건이 만족되면 primary, 아니면 회색으로 색이 변하는 버튼
 *
 * @param isActive 버튼이 눌러졌는가
 * @param onPress 버튼 눌렀을 때 실행되는 함수
 * @param content 버튼에 써진 텍스트
 * @param paddingH 버튼 가로 패딩
 * @param paddingV 버튼 세로 패딩
 * @param height 버튼 높이
 */
type ConditionButtonProps = {
  isActive: boolean;
  onPress: () => void;
  content: string;
  paddingH: number;
  paddingV: number;
  height: number;
};
export default function ConditionButton({
  isActive,
  onPress,
  content,
  paddingH,
  paddingV,
  height,
}: ConditionButtonProps): React.ReactElement {
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  return (
    <button.ConditionButton
      onPress={onPress}
      height={height}
      backgroundColor={backgroundColor}
      borderColor={isActive ? colors.primary : colors.gray2}
      paddingH={paddingH}
      paddingV={paddingV}
      activeOpacity={1}
      onPressIn={() =>
        isActive ? setBackgroundColor(colors.alpha20_primary) : null
      }
      onPressOut={() => (isActive ? setBackgroundColor('transparent') : null)}
    >
      {height === 45 ? (
        <text.Button2B textColor={isActive ? colors.primary : colors.gray5}>
          {content}
        </text.Button2B>
      ) : (
        <text.Button3 textColor={isActive ? colors.primary : colors.gray5}>
          {content}
        </text.Button3>
      )}
    </button.ConditionButton>
  );
}
