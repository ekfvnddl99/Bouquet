import React, { useState } from 'react';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

type BackgroundButtonProps = {
  onPress: () => void;
  content: string;
  height: number;
  isActive: boolean;
  paddingH: number;
  paddingV: number;
};
/**
 * 뒤에 배경색 있는 버튼
 *
 * @param onPress 버튼 눌렀을 때 실행되는 함수
 * @param content 버튼에 써진 텍스트
 * @param height 버튼 높이
 * @param isActive 버튼이 눌러졌는가
 * @param paddingH 버튼 가로 패딩
 * @param paddingV 버튼 세로 패딩
 */
export default function BackgroundButton({
  onPress,
  content,
  height,
  isActive,
  paddingH,
  paddingV,
}: BackgroundButtonProps): React.ReactElement {
  const [backgroundColor, setBackgroundColor] = useState(colors.primary);

  return (
    <button.BackgroundButton
      height={height}
      backgroundColor={isActive ? backgroundColor : colors.gray1}
      paddingH={paddingH}
      paddingV={paddingV}
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() =>
        isActive ? setBackgroundColor(colors.pressed_primary) : null
      }
      onPressOut={() => (isActive ? setBackgroundColor(colors.primary) : null)}
    >
      <text.Button3 textColor={isActive ? colors.white : colors.gray5}>
        {content}
      </text.Button3>
    </button.BackgroundButton>
  );
}
