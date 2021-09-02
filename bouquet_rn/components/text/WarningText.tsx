import React from 'react';
import { View } from 'react-native';

// styles
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

export default function WarningText({
  content,
  marginTop,
}: {
  content?: string;
  marginTop: number;
}): React.ReactElement {
  return (
    <View style={{ marginTop }}>
      <text.Caption color={colors.warning_red}>{content || ''}</text.Caption>
    </View>
  );
}
