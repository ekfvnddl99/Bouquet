import React from 'react';
import { View } from 'react-native';
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import TagItem from './TagItem';

type ProfileInfoTagProps = {
  title: string;
  tags: string[];
};
/**
 * '상세 프로필' 화면의 캐릭터 정보에서 tag 배열 컴포넌트
 * ex : title(좋아하는 것) tags(비옥한 토양, 햇살)
 *
 * @param title tag 배열 주제
 * @param tags tag 배열
 */
export default function ProfileInfoTag({
  title,
  tags,
}: ProfileInfoTagProps): React.ReactElement {
  // tag 배열에 들어갈 각 tag들의 모양을 잡아서 다시 배열로 만든다.
  const list = tags.map((tag) => <TagItem content={tag} isActive />);
  return (
    <View>
      <text.Body2B textColor={colors.black}>{title}</text.Body2B>
      <area.RowArea>{list}</area.RowArea>
    </View>
  );
}
