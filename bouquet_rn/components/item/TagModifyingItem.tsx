import React from 'react';
import { TouchableOpacity } from 'react-native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// assets
import Icon from '../../assets/Icon';

type TagArrayItemProps = {
  content: string;
  tagArray: string[];
  tagIndex: number;
  isSearching: boolean;
  setTagArray: (param: string[]) => void;
  setSearch?: (param: string) => void;
};
/**
 * 삭제 가능한 버튼이 있는 tag 컴포넌트
 *
 * @param content 태그 내용
 * @param tagArray 태그 배열
 * @param tagIndex 해당 태그 인덱스
 * @param isSearching Search에서 사용되는가
 * @param setTagArray 태그 배열 set 함수
 * @param setSearch Search에서 검색어 set 함수
 */
export default function TagModifyingItem({
  content,
  tagIndex,
  tagArray,
  isSearching,
  setTagArray,
  setSearch,
}: TagArrayItemProps): React.ReactElement {
  /**
   * 태그 배열에서 해당 태그를 삭제하는 함수
   */
  function deleteTag() {
    const tmp = [...tagArray];
    tmp.splice(tagIndex, 1);
    setTagArray(tmp);
  }

  return (
    <button.TagModifyButton
      backgroundColor={isSearching ? colors.white : colors.alpha10_primary}
      activeOpacity={1}
      onPress={() => (isSearching && setSearch ? setSearch(content) : {})}
    >
      <text.Caption
        textColor={isSearching ? colors.black : colors.primary}
        style={{ flexShrink: 1 }}
      >
        {content}
      </text.Caption>
      <TouchableOpacity onPress={() => deleteTag} style={{ flexGrow: 1 }}>
        {isSearching ? (
          <Icon icon="x" size={25} />
        ) : (
          <Icon icon="xFocus" size={25} />
        )}
      </TouchableOpacity>
    </button.TagModifyButton>
  );
}
