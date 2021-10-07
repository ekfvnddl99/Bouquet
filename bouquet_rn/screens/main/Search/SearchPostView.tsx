import React, { useState } from 'react';
import { FlatList } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// components
import PostItem from '../../../components/item/PostItem';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

type SearchPostViewProps = {
  searchInput: string;
  postArray: Post<AllTemplates>[];
  onEndReached: () => Promise<void>;
  renderItem: ({
    item,
    index,
  }: {
    item: Post<AllTemplates>;
    index: number;
  }) => JSX.Element;
};
export default function SearchPostView({
  searchInput,
  postArray,
  onEndReached,
  renderItem,
}: SearchPostViewProps): React.ReactElement {
  return (
    <>
      {postArray.length > 0 ? (
        <area.ContainerBlank30
          style={{ marginTop: searchInput.length > 0 ? 0 : 10 }}
        >
          <text.Subtitle3 textColor={colors.black}>
            {searchInput.length > 0 ? '게시물' : i18n.t('인기 게시물')}
          </text.Subtitle3>
          <FlatList
            style={{ marginTop: 12 }}
            data={postArray}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
          />
        </area.ContainerBlank30>
      ) : null}
    </>
  );
}
