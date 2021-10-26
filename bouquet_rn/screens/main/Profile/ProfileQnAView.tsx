import React from 'react';
import { Animated } from 'react-native';

// utils
import { Qna } from '../../../utils/types/PostTypes';

type ProfileQnAViewProps = {
  qnaArray: Array<Qna> | undefined;
  renderItem: ({ item, index }: { item: Qna; index: number }) => JSX.Element;
  listFooterComponent: JSX.Element;
};
export default function ProfileQnAScreen({
  qnaArray,
  renderItem,
  listFooterComponent,
}: ProfileQnAViewProps): React.ReactElement {
  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      data={qnaArray}
      renderItem={renderItem}
      ListFooterComponent={listFooterComponent}
    />
  );
}
