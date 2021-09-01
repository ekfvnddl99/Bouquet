import React from 'react';

// styles
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

export default function NameNText({
  name,
  sub,
}: {
  name: string;
  sub: string;
}): React.ReactElement {
  return (
    <area.RowArea>
      <text.Subtitle2B color={colors.black}>{name}</text.Subtitle2B>
      <text.Subtitle2R color={colors.black}>{sub}</text.Subtitle2R>
    </area.RowArea>
  );
}
