import React, { useEffect } from 'react';
import { Animated, FlatList } from 'react-native';
import i18n from 'i18n-js';
import { useRecoilState } from 'recoil';

// styles
import colors from '../../../styles/colors';
import * as text from '../../../styles/styled-components/text';

// logics
import { recentSearchList } from '../../../logics/atoms';
import useUser from '../../../logics/hooks/useUser';

// components
import TagModifyingItem from '../../../components/item/TagModifyingItem';

type SearchRecentViewProps = {
  searchInput: string;
  setSearchResult: (input: string) => void;
  recentList: string[];
  setRecentList: (input: string[]) => void;
};
export default function SearchRecentView({
  searchInput,
  setSearchResult,
  recentList,
  setRecentList,
}: SearchRecentViewProps): React.ReactElement {
  const user = useUser();
  return (
    <>
      {searchInput.length === 0 && user.name !== '' ? (
        <Animated.View style={{ marginLeft: 30 }}>
          <text.Subtitle3 textColor={colors.black}>
            {i18n.t('최근 검색어')}
          </text.Subtitle3>
          <FlatList
            style={{ marginTop: 12, marginRight: 4 }}
            data={recentList}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, idx) => idx.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={(obj) => (
              <TagModifyingItem
                content={obj.item}
                setSearch={(input) => setSearchResult(input)}
                tagIndex={obj.index}
                isSearching
                tagArray={recentList}
                setTagArray={setRecentList}
              />
            )}
          />
        </Animated.View>
      ) : null}
    </>
  );
}
