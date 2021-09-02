import React from 'react';
import { View } from 'react-native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

type QuestionItemProps = {
  question: string;
};
export default function QuestionItem({
  question,
}: QuestionItemProps): React.ReactElement {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
      <text.Subtitle2B color={colors.primary}>Q.</text.Subtitle2B>
      <text.Subtitle3 color={colors.black}>{question}</text.Subtitle3>
    </View>
  );
}
