import React from 'react';
import { FlatList } from 'react-native';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

// components
import PostItem from '../../../components/item/PostItem';

type ProfileFeedViewProps = {
  postArray: Post<AllTemplates>[] | undefined;
  routePrefix: string;
  onEndReached: () => Promise<void>;
};
export default function ProfileFeedView({
  postArray,
  routePrefix,
  onEndReached,
}: ProfileFeedViewProps): React.ReactElement {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, idx) => item.id.toString()}
      data={postArray}
      renderItem={(obj) => (
        <PostItem postInfo={obj.item} routePrefix={routePrefix} />
      )}
    />
  );
}
