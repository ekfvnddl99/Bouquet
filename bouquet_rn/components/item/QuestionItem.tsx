import React from 'react';
import { View } from 'react-native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

/**
 * 질문만 있는 컴포넌트
 * Q. (질문) 형태
 *
 * @param question 질문
 */
type QuestionItemProps = {
  question: string;
};
export default function QuestionItem({
  question,
}: QuestionItemProps): React.ReactElement {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
      <text.Subtitle2B textColor={colors.primary}>Q.</text.Subtitle2B>
      <text.Subtitle3 textColor={colors.black}>{question}</text.Subtitle3>
    </View>
  );
}
