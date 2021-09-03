import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

/**
 * primary 색 텍스트인 버튼
 *
 * @param onPress 버튼 눌렀을 때 실행되는 함수
 * @param content 버튼에 써진 텍스트
 * @param isBold 버튼 텍스트가 bold인지 아닌지
 */
type PrimaryTextButtonProps = {
  onPress: () => void;
  content: string;
  isBold: boolean;
};
export default function PrimaryTextButton({
  onPress,
  content,
  isBold,
}: PrimaryTextButtonProps): React.ReactElement {
  const [textColor, setTextColor] = useState(colors.primary);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => setTextColor(colors.pressed_primary)}
      onPressOut={() => setTextColor(colors.primary)}
    >
      {isBold ? (
        <text.Button2B textColor={textColor}>{content}</text.Button2B>
      ) : (
        <text.Body2R textColor={textColor}>{content}</text.Body2R>
      )}
    </TouchableOpacity>
  );
}
