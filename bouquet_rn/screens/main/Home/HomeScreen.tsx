import React, { useRef, useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import { getFeedPostListAsync } from '../../../logics/server/Home';
import { getTopPostListAsync } from '../../../logics/server/Search';

// utils
import { AllTemplates, Post } from '../../../utils/types/PostTypes';

// components
import PostItem from '../../../components/item/PostItem';
import NameNText from '../../../components/text/NameNText';
import NotLoginPrimaryButton from '../../../components/button/NotLoginPrimaryButton';
import FloatingButton from '../../../components/button/FloatingButton';
import QnATextInput from '../../../components/input/QnATextInput';
import ProfileButton from '../../../components/button/ProfileButton';

const HEADER_MAX_HEIGHT = 94;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function HomeScreen(): React.ReactElement {
  const [myCharacter] = useCharacter();
  // 로그인한 상태인지 아닌지
  const [isLogined, setIsLogined] = useState(false);
  // 인기 게시글 담을 state
  const [postArray, setPostArray] = useState<Post<AllTemplates>[]>();

  const [pageNum, setPageNum] = useState(1);
  const [isPageEnd, setIsPageEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // 로그인한 상태인지 아닌지 확인
  useEffect(() => {
    if (myCharacter.id === -1) setIsLogined(false);
    else setIsLogined(true);
  }, [myCharacter.id]);

  async function getPost(newPageNum?: number, isRefreshing?: boolean) {
    const serverResult = await getTopPostListAsync(
      newPageNum || pageNum,
      myCharacter.id,
    );
    if (serverResult.isSuccess) {
      if (serverResult.result.length === 0) {
        setIsPageEnd(true);
        if (postArray === undefined) setPostArray(serverResult.result);
      } else if (postArray === undefined || isRefreshing)
        setPostArray(serverResult.result);
      else {
        const tmpArray = postArray;
        serverResult.result.forEach((obj) => tmpArray.push(obj));
        setPostArray(tmpArray);
      }
    } else {
      alert(serverResult.result.errorMsg);
    }
    setRefreshing(false);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    setPageNum(1);
    setIsPageEnd(false);
    await getPost(1, true);
  };

  // 가장 처음에 인기 게시물 가져옴
  useEffect(() => {
    getPost();
  }, []);

  /**
   * animation 관련
   * scroll - animation 변수
   * ScaleImg - 프로필 이미지 크기 조절
   * TranslateImgX - 프로필 이미지 X축 이동
   * TranslateImgY - 프로필 이미지 Y축 이동
   * OpacityTitle - 제목 투명도 정도. 위로 올리면 제목 없어짐.
   * OpacityHeader - 헤더 투명도 정도
   */
  const scroll = useRef(new Animated.Value(0)).current;
  const ScaleImg = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    // 40->28 비율 계산
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });
  const TranslateImgX = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 14],
    extrapolate: 'clamp',
  });
  const TranslateImgY = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    // 왜 -14-16이 되는 건지 잘 설명을 못하겠음...
    outputRange: [0, -14 - 16],
    extrapolate: 'clamp',
  });
  const OpacityTitle = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    // 투명도 속도 맞춰서 설정함!
    outputRange: [1, 0, -3],
    extrapolate: 'clamp',
  });
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />

      <area.RowArea style={{ marginHorizontal: 30, marginTop: 30 }}>
        <AnimationText
          style={[
            {},
            { opacity: OpacityTitle },
            { transform: [{ translateY: TranslateImgY }] },
          ]}
        >
          {isLogined ? (
            <>
              <NameNText name={myCharacter.name} sub={i18n.t('의')} />
              <text.Subtitle2R textColor={colors.black}>
                {i18n.t('피드')}
              </text.Subtitle2R>
            </>
          ) : (
            <>
              <text.Subtitle2R textColor={colors.black}>
                {i18n.t('눈길이 가는')}
              </text.Subtitle2R>
              <text.Subtitle2B textColor={colors.black}>
                {i18n.t('피드')}
              </text.Subtitle2B>
            </>
          )}
        </AnimationText>
        {isLogined ? (
          <AnimationImg
            style={[
              {},
              {
                transform: [
                  { scale: ScaleImg },
                  { translateY: TranslateImgY },
                  { translateX: TranslateImgX },
                ],
              },
            ]}
          >
            <ProfileButton
              diameter={40}
              isAccount={false}
              isJustImg
              isPress={false}
              name={myCharacter.name}
              profileImg={myCharacter.profile_img}
              routePrefix="HomeTab"
            />
          </AnimationImg>
        ) : null}
      </area.RowArea>

      <Animated.FlatList
        style={{
          marginTop: HEADER_MIN_HEIGHT - 30,
          marginHorizontal: 30,
        }}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
        data={postArray}
        ListHeaderComponent={() => (
          <View style={{ marginTop: 20 + 14 }}>
            {isLogined ? <QnATextInput routePrefix="HomeTab" /> : null}
          </View>
        )}
        onEndReached={async () => {
          if (!isPageEnd) {
            const nextPageNum = pageNum + 1;
            setPageNum(nextPageNum);
            await getPost(nextPageNum);
          }
        }}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={(obj) => (
          <PostItem postInfo={obj.item} routePrefix="HomeTab" />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {isLogined ? (
        <FloatingButton routePrefix="HomeTab" />
      ) : (
        <>
          <View style={{ flex: 1 }} />
          <NotLoginPrimaryButton />
        </>
      )}
    </area.Container>
  );
}

const AnimationText = styled(Animated.View)`
  position: absolute;
  resize-mode: cover;
  background-color: ${'transparent'};
  border-radius: 15;
  align-items: flex-start;
  justify-content: flex-start;
  top: 0;
  left: 0;
`;

const AnimationImg = styled(Animated.View)`
  position: absolute;
  resize-mode: cover;
  background-color: ${'transparent'};
  border-radius: 15;
  align-items: center;
  justify-content: flex-start;
  top: 0;
  right: 0;
`;

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
