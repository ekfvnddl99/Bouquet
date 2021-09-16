import React, { useState } from 'react';

// styles
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

type LineButtonProps = {
  onPress?: () => void;
  content: string;
  borderColor: string;
};
/**
 * 배경색 없이 테두리만 있는 버튼
 *
 * @param onPress 버튼 눌렀을 때 실행되는 함수
 * @param content 버튼 이름
 * @param borderColor
 */
export default function LineButton({
  onPress,
  content,
  borderColor,
}: LineButtonProps): React.ReactElement {
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const pressInColor = setInColor(borderColor);
  /**
   * 버튼 오리지널 색에 따라서, 버튼 눌렀을 때 나타나는 색을 지정하는 함수
   *
   * @param color 버튼 색
   * @returns 버튼 눌렀을 때 나오는 색을 버튼 색에 따라서 반환
   */
  function setInColor(buttonColor: string) {
    if (buttonColor === 'primary') return 'alpha20_primary';
    if (buttonColor === 'black') return 'gray2';
    return 'transparent';
  }

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
