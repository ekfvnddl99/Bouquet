import React from 'react';
import { FlatList } from 'react-native';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

// components
import PostItem from '../../../components/item/PostItem';

type ProfileFeedViewProps = {
  postArray: Post<AllTemplates>[] | undefined;
  routePrefix: string;
  isPostPageEnd: boolean;
  postPageNum: number;
  setPostPageNum: (param: number) => void;
};
export default function ProfileFeedView({
  postArray,
  routePrefix,
  isPostPageEnd,
  postPageNum,
  setPostPageNum,
}: ProfileFeedViewProps): React.ReactElement {
  return (
    <FlatList
      windowSize={3}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (!isPostPageEnd) setPostPageNum(postPageNum + 1);
        // console.log('feed!!!');
      }}
      onEndReachedThreshold={0.8}
      keyExtractor={(item, idx) => idx.toString()}
      data={postArray}
      renderItem={(obj) => (
        <PostItem postInfo={obj.item} routePrefix={routePrefix} />
      )}
    />
  );
}
