import React from 'react';
import { FlatList } from 'react-native';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

type ProfileFeedViewProps = {
  postArray: Post<AllTemplates>[] | undefined;
  renderItem: ({
    item,
    index,
  }: {
    item: Post<AllTemplates>;
    index: number;
  }) => JSX.Element;
  listFooterComponent: JSX.Element;
};
export default function ProfileFeedView({
  postArray,
  renderItem,
  listFooterComponent,
}: ProfileFeedViewProps): React.ReactElement {
  return (
    <FlatList
      keyExtractor={(item) => `${item.id}`}
      showsVerticalScrollIndicator={false}
      data={postArray}
      renderItem={renderItem}
      ListFooterComponent={listFooterComponent}
    />
  );
}
