import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

// logics
import { getQnaListAsync } from '../../../logics/server/QnAs';

// components
import QnAItem from '../../../components/item/QnAItem';

// utils
import { Qna } from '../../../utils/types/PostTypes';
import { Character } from '../../../utils/types/UserTypes';

type ProfileQnAViewProps = {
  qnaArray: Array<Qna>;
  routePrefix: string;
  onEndReached: () => Promise<void>;
  characterInfo: Character;
};
export default function ProfileQnAScreen({
  qnaArray,
  routePrefix,
  onEndReached,
  characterInfo,
}: ProfileQnAViewProps): React.ReactElement {
  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      keyExtractor={(item, idx) => idx.toString()}
      data={qnaArray}
      renderItem={(obj) => (
        <QnAItem
          question={obj.item.question}
          answer={obj.item.answer}
          characterInfo={characterInfo}
          routePrefix={routePrefix}
        />
      )}
    />
  );
}
