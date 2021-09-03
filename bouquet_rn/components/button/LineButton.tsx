import React, { useState } from 'react';

// styles
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

/**
 *
 * @param color 버튼 색
 * @returns 버튼 눌렀을 때 나오는 색을 버튼 색에 따라서 반환
 */
function setInColor(color: string) {
  if (color === 'primary') return 'alpha20_primary';
  if (color === 'black') return 'gray2';
  return 'transparent';
}

/**
 * 배경색 없이 테두리만 있는 버튼
 *
 * @param onPress 버튼 눌렀을 때 실행되는 함수
 * @param content 버튼 이름
 * @param borderColor
 */
type LineButtonProps = {
  onPress: () => void;
  content: string;
  borderColor: string;
};

export default function LineButton({
  onPress,
  content,
  borderColor,
}: LineButtonProps): React.ReactElement {
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const pressInColor = setInColor(borderColor);

  return (
    <button.LineButton
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      paddingH={12}
      paddingV={4}
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => setBackgroundColor(pressInColor)}
      onPressOut={() => setBackgroundColor('transparent')}
    >
      <text.Button3 textColor={borderColor}>{content}</text.Button3>
    </button.LineButton>
  );
}
