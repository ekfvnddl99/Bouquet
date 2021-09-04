import React from 'react';
import { View } from 'react-native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

type WarningTextProps = {
  content: string;
  marginTop: number;
};
/**
 * 경고 문구 텍스트
 *
 * @param content 경고 문구
 * @param marginTop marginTop의 값
 */
export default function WarningText({
  content,
  marginTop,
}: WarningTextProps): React.ReactElement {
  return (
    <View style={{ marginTop }}>
      <text.Caption textColor={colors.warning_red}>{content}</text.Caption>
    </View>
  );
}
