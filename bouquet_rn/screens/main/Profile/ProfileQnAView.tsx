import React from 'react';
import { Animated } from 'react-native';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

// components
import QnAItem from '../../../components/item/QnAItem';

// utils
import { noCharacter } from '../../../utils/types/UserTypes';

type ProfileQnAViewProps = {
  postArray: Post<AllTemplates>[] | undefined;
  routePrefix: string;
  isPostPageEnd: boolean;
  postPageNum: number;
  setPostPageNum: (param: number) => void;
  setTopView: () => React.ReactElement;
  animationValue: Animated.Value;
};
export default function ProfileQnAScreen({
  postArray,
  routePrefix,
  isPostPageEnd,
  postPageNum,
  setPostPageNum,
  setTopView,
  animationValue,
}: ProfileQnAViewProps): React.ReactElement {
  // dummy data - 서버에서 불러와야 함
  const data = [
    { id: 1, question: 'asdf', answer: 'asdfasdf', characterInfo: noCharacter },
    { id: 2, question: 'asdf', answer: 'asdfasdf', characterInfo: noCharacter },
    { id: 3, question: 'asdf', answer: 'asdfasdf', characterInfo: noCharacter },
  ];

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={setTopView}
      // onEndReached={() => {
      //   if (!isPostPageEnd) setPostPageNum(postPageNum + 1);
      //   // console.log('done!!!');
      // }}
      // onEndReachedThreshold={0.8}
      keyExtractor={(item, idx) => idx.toString()}
      data={data}
      renderItem={(obj) => (
        <QnAItem
          question={obj.item.question}
          answer={obj.item.answer}
          characterInfo={obj.item.characterInfo}
          routePrefix={routePrefix}
        />
      )}
    />
  );
}
