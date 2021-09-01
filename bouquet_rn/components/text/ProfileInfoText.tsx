import React from 'react';
import { View } from 'react-native';

// styles
import * as text from '../../styles/styled-components/text';

export default function ProfileInfoText({
  bold,
  regular,
  color,
  center,
}: {
  bold: string;
  regular: string;
  color: string;
  center: number;
}): React.ReactElement {
  return (
    <View style={center === 1 ? { alignItems: 'center' } : null}>
      <text.Body2B color={color}>{bold}</text.Body2B>
      <text.Body2R color={color} numberOfLines={1}>
        {regular}
      </text.Body2R>
    </View>
  );
}
