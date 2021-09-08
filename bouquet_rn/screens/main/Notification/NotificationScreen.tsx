import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import useUser from '../../../logics/hooks/useUser';

// components
import NotificationItem from '../../../components/item/NotificationItem';
import NameNText from '../../../components/text/NameNText';
import NotLoginPrimaryButton from '../../../components/button/NotLoginPrimaryButton';
import ProfileButton from '../../../components/button/ProfileButton';

const HEADER_MAX_HEIGHT = 94;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function NotificationScreen(): React.ReactElement {
  // 더미데이터
  const Data = [
    { a: '오란지', b: '님이 당신을 팔로우해요.' },
    { a: '폭스처돌이1호님', b: '이 당신의 게시글을 좋아해요.' },
    { a: '비걸최고님', b: '이 당신의 게시글을 좋아해요.' },
    { a: '폭스럽님', b: '이 당신의 게시글에 댓글을 남겼어요.' },
    { a: '단호좌현지님', b: '님이 당신을 팔로우해요.' },
    { a: '러블리폭스님', b: '이 당신의 게시글에 댓글을 남겼어요.' },
    { a: '비스트걸스서포터', b: '님이 당신의 게시글에 댓글을 남겼어요.' },
    { a: 'PO폭스WER님', b: '님이 당신의 게시글에 댓글을 남겼어요.' },
    { a: 'PO폭스WER님', b: '이 당신의 게시글을 좋아해요.' },
    { a: '비걸핑크해', b: '님이 당신의 게시글에 댓글을 남겼어요.' },
    { a: '비걸핑크해', b: '님이 당신의 게시글을 좋아해요.' },
  ];

  const navigation = useNavigation();
  const user = useUser();
  const [myCharacter] = useCharacter();
  // 로그인한 상태인지 아닌지
  const [isLogined, setIsLogined] = useState(false);

  // 로그인한 상태인지 아닌지 확인
  useEffect(() => {
    if (user === undefined || myCharacter.id === -1) setIsLogined(false);
    else setIsLogined(true);
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
    outputRange: [1, 0, -3],
    extrapolate: 'clamp',
  });
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  /**
   * 알람 개수가 0이냐 아니냐에 따라 달라지는 구성
   * @param notificationNumber 알람이 몇개 와있는가에 따라서 다르다.
   */
  function setNotification(notificationNumber: number) {
    if (notificationNumber) {
      <FlatList
        data={Data}
        keyExtractor={(item) => item.a}
        renderItem={(obj) => (
          <TouchableWithoutFeedback>
            <NotificationItem name={obj.item.a} content={obj.item.b} />
          </TouchableWithoutFeedback>
        )}
      />;
    } else {
      <View style={{ alignItems: 'center' }}>
        <text.Caption textColor={colors.gray6}>
          {i18n.t('이제 확인할 알림이 없어요')}
        </text.Caption>
      </View>;
    }
  }

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />
      <area.RowArea style={{ marginHorizontal: 30, marginTop: 30 }}>
        <AnimationText
          style={[
            { opacity: OpacityTitle },
            { transform: [{ translateY: TranslateImgY }] },
          ]}
        >
          <NameNText
            name={isLogined ? myCharacter.name : '당신'}
            sub={i18n.t('의')}
          />
          <text.Subtitle2R textColor={colors.black}>
            {i18n.t('알림')}
          </text.Subtitle2R>
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
              name={myCharacter.name}
              profileImg={myCharacter.profile_img}
            />
          </AnimationImg>
        ) : null}
      </area.RowArea>

      <Animated.ScrollView
        style={{ marginTop: HEADER_MIN_HEIGHT - 30 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
      >
        {isLogined ? (
          <>
            <View style={{ paddingTop: 30 + 14 }} />
            {setNotification(Data.length)}
          </>
        ) : (
          <NotificationItem
            name="Bouquet"
            content="이 꿈꾸던 부캐를 만들어 보자고 제안해요."
          />
        )}
      </Animated.ScrollView>
      {isLogined ? null : (
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'flex-end' }}
          onPress={() => navigation.navigate('CharacterGeneration')}
        >
          <NotLoginPrimaryButton />
        </TouchableOpacity>
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
  left: 0;
`;

const AnimationHeader = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${colors.white};
  overflow: hidden;
  height: ${HEADER_MIN_HEIGHT}+${StatusBarHeight};
  border-radius: 15;
`;
