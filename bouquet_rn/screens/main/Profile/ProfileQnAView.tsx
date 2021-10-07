import React from 'react';
import { Animated } from 'react-native';

// utils
import { Qna } from '../../../utils/types/PostTypes';

type ProfileQnAViewProps = {
  qnaArray: Array<Qna> | undefined;
  onEndReached: () => Promise<void>;
  renderItem: ({ item, index }: { item: Qna; index: number }) => JSX.Element;
};
export default function ProfileQnAScreen({
  qnaArray,
  onEndReached,
  renderItem,
}: ProfileQnAViewProps): React.ReactElement {
  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      keyExtractor={(item, idx) => item.id.toString()}
      data={qnaArray}
      renderItem={renderItem}
    />
  );
}
