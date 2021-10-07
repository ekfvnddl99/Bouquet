import React from 'react';
import { FlatList } from 'react-native';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

type ProfileFeedViewProps = {
  postArray: Post<AllTemplates>[] | undefined;
  onEndReached: () => Promise<void>;
  renderItem: ({
    item,
    index,
  }: {
    item: Post<AllTemplates>;
    index: number;
  }) => JSX.Element;
};
export default function ProfileFeedView({
  postArray,
  onEndReached,
  renderItem,
}: ProfileFeedViewProps): React.ReactElement {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, idx) => `${item.id}`}
      data={postArray}
      renderItem={renderItem}
    />
  );
}
