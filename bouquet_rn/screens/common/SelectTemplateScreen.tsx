import React, { useRef } from 'react';
import { FlatList, View, Animated } from 'react-native';
import styled from 'styled-components/native';
import { useSetRecoilState, useRecoilValue } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// logics
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import { selectTemplate } from '../../logics/atoms';
import useCharacter from '../../logics/hooks/useCharacter';

// components
import SelectTemplateItem from '../../components/item/SelectTemplateItem';
import HeaderItem from '../../components/item/HeaderItem';

// templates
import TextTemplate from '../template/TextTemplate';
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

// 헤더의 최대.최소 길이
const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SelectTemplateScreen(): React.ReactElement {
  const [myCharacter] = useCharacter();

  // 내가 고른 템플릿 아이디와, 그 아이디의 set 함수
  const select = useRecoilValue(selectTemplate);
  const setSelect = useSetRecoilState(selectTemplate);

  /**
   * scroll - animation 변수
   * OpacityHeader - 헤더 투명도.
   */
  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  // 템플릿 예시 설명
  const templates = [
    {
      name: '선택 안 함.',
      explain:
        '텍스트만 담을 수 있는 기본적인 템플릿이에요. 텍스트로 전하고 싶은 말을 담아보세요.',
      svg: <TextTemplate mode="ex" />,
    },
    {
      name: '이미지',
      explain:
        '이미지를 담을 수 있는 템플릿이에요. 가장 빛났던 순간을 사진으로 남겨 두고두고 간직해보세요.',
      svg: <ImageTemplate mode="ex" />,
    },
    {
      name: '앨범',
      explain:
        '음악인이 되어 앨범을 발매할 수 있는 템플릿이에요. 소리는 없지만 가사와 앨범 소개까지 있는 충실한 앨범이랍니다.',
      svg: <AlbumTemplate mode="ex" />,
    },
    {
      name: '일기',
      explain:
        '어릴 적 적었던 그림일기를 구현할 수 있는 템플릿이에요. 직접 그리진 못해도 직접 찍은 사진과 함께 일기를 완성해보세요.',
      svg: <DiaryTemplate mode="ex" />,
    },
    {
      name: '리스트',
      explain:
        '항목들을 나열할 수 있는 리스트 템플릿이에요. 하나의 주제에 대해서 여러가지 이야기 하고 싶을 때 사용해보세요.',
      svg: <ListTemplate mode="ex" />,
    },
  ];

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />

      <HeaderItem
        isAccount={false}
        isBackButton
        name={myCharacter.name}
        profileImg={myCharacter.profile_img}
      />

      <Animated.ScrollView
        style={{ marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ paddingTop: 20 }} />
        <FlatList
          data={templates}
          showsVerticalScrollIndicator={false}
          renderItem={(obj) => (
            <SelectTemplateItem
              templateName={obj.item.name}
              explain={obj.item.explain}
              exampleSvg={obj.item.svg}
              selectId={select}
              setSelectId={setSelect}
              thisId={obj.index}
            />
          )}
        />
      </Animated.ScrollView>
    </area.Container>
  );
}

const AnimationHeader = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${colors.white};
  overflow: hidden;
  height: ${HEADER_MIN_HEIGHT + StatusBarHeight};
  border-radius: 15;
`;
