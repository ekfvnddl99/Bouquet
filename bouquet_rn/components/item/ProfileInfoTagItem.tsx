import React from 'react';
import { View } from 'react-native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

// components
import TagItem from './TagItem';

type ProfileInfoTagProps = {
  title: string;
  tagArray: string[];
  isMini: boolean;
};
/**
 * '상세 프로필' 화면의 캐릭터 정보에서 tag 배열 컴포넌트
 * @description ex : title(좋아하는 것) tagArray(비옥한 토양, 햇살)
 *
 * @param title tag 배열 주제
 * @param tagArray tag 배열
 * @param isMini 스와이프 뷰에 있는 미니 형태냐
 */
export default function ProfileInfoTag({
  title,
  tagArray,
  isMini,
}: ProfileInfoTagProps): React.ReactElement {
  // tag 배열에 들어갈 각 tag들의 모양을 잡아서 다시 배열로 만든다.
  const list = tagArray.map((tag, idx) => (
    <View
      style={{ marginTop: 2, maxWidth: isMini ? 100 : undefined }}
      key={idx.toString()}
    >
      <TagItem content={tag} isActive isMini={isMini} />
    </View>
  ));
  return (
    <View>
      <text.Body2B textColor={colors.black}>{title}</text.Body2B>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flexShrink: 1,
          alignItems: 'center',
        }}
      >
        {isMini ? list[0] : list}
        {isMini && list.length > 1 ? (
          <text.Body2R textColor={colors.black}>{`외 ${
            list.length - 1
          }개`}</text.Body2R>
        ) : null}
      </View>
    </View>
  );
}
