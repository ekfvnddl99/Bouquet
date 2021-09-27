import React from 'react';
import { Animated } from 'react-native';

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
  setTopView: () => React.ReactElement;
  animationValue: Animated.Value;
};
export default function ProfileFeedView({
  postArray,
  routePrefix,
  isPostPageEnd,
  postPageNum,
  setPostPageNum,
  setTopView,
  animationValue,
}: ProfileFeedViewProps): React.ReactElement {
  return (
    <Animated.FlatList
      ListHeaderComponent={setTopView}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        // if (!isPostPageEnd) setPostPageNum(postPageNum + 1);
        console.log('done!!!');
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
