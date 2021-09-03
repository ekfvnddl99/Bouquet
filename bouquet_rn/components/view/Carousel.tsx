import React from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';

// components
import ProfileDetailItem from '../item/ProfileDetailItem';

// utils
import { Character } from '../../utils/types/UserTypes';

/**
 * '캐릭터 스와이프 뷰'에서 옆으로 넘기는 뷰
 *
 * @param pages 구성하는 페이지
 * @param offset 옆에 살짝 보이는 다른 페이지의 너비
 * @param gap 옆의 페이지와의 간격
 * @param pageWidth 페이지 너비
 * @param setPage 페이지 set 함수
 */
interface carouselProps {
  pages: Array<Character>;
  offset: number;
  gap: number;
  pageWidth: number;
  setPage: (param: number) => void;
}
export default function Carousel({
  pages,
  offset,
  gap,
  pageWidth,
  setPage,
}: carouselProps): React.ReactElement {
  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        data={pages}
        onScroll={onScroll}
        decelerationRate="fast"
        horizontal
        pagingEnabled
        snapToInterval={pageWidth + gap}
        showsHorizontalScrollIndicator={false}
        renderItem={(obj) => (
          <TouchableWithoutFeedback>
            <View style={{ width: pageWidth, marginHorizontal: gap / 2 }}>
              <ProfileDetailItem isMini character={obj.item} isOwner />
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
}
