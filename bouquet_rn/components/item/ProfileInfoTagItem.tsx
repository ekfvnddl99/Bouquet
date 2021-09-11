import React from 'react';
import { View } from 'react-native';
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import TagItem from './TagItem';

type ProfileInfoTagProps = {
  title: string;
  tagArray: string[];
};
/**
 * '상세 프로필' 화면의 캐릭터 정보에서 tag 배열 컴포넌트
 * @description ex : title(좋아하는 것) tagArray(비옥한 토양, 햇살)
 *
 * @param title tag 배열 주제
 * @param tagArray tag 배열
 */
export default function ProfileInfoTag({
  title,
  tagArray,
}: ProfileInfoTagProps): React.ReactElement {
  // tag 배열에 들어갈 각 tag들의 모양을 잡아서 다시 배열로 만든다.
  const list = tagArray.map((tag, idx) => (
    <View style={{ marginTop: 2 }}>
      <TagItem content={tag} isActive key={idx.toString()} />
    </View>
  ));
  return (
    <View>
      <text.Body2B textColor={colors.black}>{title}</text.Body2B>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', flexShrink: 1 }}>
        {list}
      </View>
    </View>
  );
}
