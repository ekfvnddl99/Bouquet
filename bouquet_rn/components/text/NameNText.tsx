import React from 'react';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

type NameNTextProps = {
  name: string;
  sub: string;
};
/**
 * 이름과 그 옆에 붙는 자잘한 말을 나타내는 컴포넌트
 *
 * @param name 이름
 * @param sub '-의'처럼 이름 옆에 붙는 말
 */
export default function NameNText({
  name,
  sub,
}: NameNTextProps): React.ReactElement {
  return (
    <area.RowArea>
      <text.Subtitle2B textColor={colors.black}>{name}</text.Subtitle2B>
      <text.Subtitle2R textColor={colors.black}>{sub}</text.Subtitle2R>
    </area.RowArea>
  );
}
