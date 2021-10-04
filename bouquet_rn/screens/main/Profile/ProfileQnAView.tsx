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
  qnaArray: Array<Qna> | undefined;
  routePrefix: string;
  onEndReached: () => Promise<void>;
  characterInfo: Character;
  refresh?: () => Promise<void>;
};
export default function ProfileQnAScreen({
  qnaArray,
  routePrefix,
  onEndReached,
  characterInfo,
  refresh,
}: ProfileQnAViewProps): React.ReactElement {
  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      keyExtractor={(item, idx) => item.id.toString()}
      data={qnaArray}
      renderItem={(obj) => (
        <QnAItem
          qna={obj.item}
          characterInfo={characterInfo}
          routePrefix={routePrefix}
          refresh={refresh}
        />
      )}
    />
  );
}
