import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Animated, FlatList } from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { useRecoilState } from 'recoil';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// assets
import Svg from '../../../assets/Icon';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as button from '../../../styles/styled-components/button';
import * as elses from '../../../styles/styled-components/elses';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import useViewPost from '../../../logics/hooks/useViewPost';
import useViewCharacter from '../../../logics/hooks/useViewCharacter';
import {
  deleteNotificationAsync,
  getNotificationListAsync,
  getNotificationCountAsync,
} from '../../../logics/server/Notification';
import { isNewNotification } from '../../../logics/atoms';

// utils
import { Notification } from '../../../utils/types/PostTypes';

// components
import NotificationItem from '../../../components/item/NotificationItem';
import NameNText from '../../../components/text/NameNText';
import NotLoginPrimaryButton from '../../../components/button/NotLoginPrimaryButton';
import ProfileButton from '../../../components/button/ProfileButton';
import FloatingButton from '../../../components/button/FloatingButton';

const HEADER_MAX_HEIGHT = 94;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function NotificationScreen(): React.ReactElement {
  const navigation = useNavigation();
  const [, setViewPost] = useViewPost();
  const [, setViewCharacter] = useViewCharacter();
  const [isNew, setIsNew] = useRecoilState(isNewNotification);

  const [myCharacter] = useCharacter();
  // 로그인한 상태인지 아닌지
  const [isLogined, setIsLogined] = useState(false);

  // 인기 게시글 담을 state
  const [notificationArray, setNotificationArray] = useState<Notification[]>();

  const [pageNum, setPageNum] = useState(1);
  const [isPageEnd, setIsPageEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const storeNotificationCount = async (value: number): Promise<void> => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`N${myCharacter.name}`, jsonValue);
  };
  const getNowNotificationCount = async () => {
    const serverResult = await getNotificationCountAsync();
    if (serverResult.isSuccess) return serverResult.result;
    alert(serverResult.result.errorMsg);
    return -1;
  };
  useFocusEffect(
    useCallback(() => {
      async function setNotificationCount() {
        await getNowNotificationCount().then((now) => {
          if (now !== -1) {
            setIsNew(false);
            storeNotificationCount(now);
          }
        });
      }
      if (isLogined) {
        onRefresh();
        setNotificationCount();
      }
    }, []),
  );

  // 로그인한 상태인지 아닌지 확인
  useEffect(() => {
    if (myCharacter.id === -1) setIsLogined(false);
    else setIsLogined(true);
  }, [myCharacter.id]);

  const deleteNotification = async (id: number) => {
    const serverResult = await deleteNotificationAsync(id);
    if (serverResult.isSuccess) {
      onRefresh();
    } else console.log(serverResult.result.info);
  };

  async function getNotification(newPageNum?: number, isRefreshing?: boolean) {
    const serverResult = await getNotificationListAsync(newPageNum || pageNum);
    if (serverResult.isSuccess) {
      if (serverResult.result.length === 0) setIsPageEnd(true);
      if (notificationArray === undefined || isRefreshing)
        setNotificationArray(serverResult.result);
      else {
        const tmpArray = notificationArray;
        serverResult.result.forEach((obj) => tmpArray.push(obj));
        setNotificationArray(tmpArray);
      }
    } else {
      console.log(serverResult.result.info);
    }
    setRefreshing(false);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    setPageNum(1);
    setIsPageEnd(false);
    await getNotification(1, true);
  };

  // 가장 처음에 인기 게시물 가져옴
  useEffect(() => {
    getNotification();
  }, []);

  const goNavigate = async (param: string | number) => {
    if (typeof param === 'number') {
      await setViewPost(param);
      navigation.navigate(`NotiTabPostStack`, {
        screen: 'PostDetail',
        params: { routePrefix: 'NotiTab' },
      });
    } else {
      await setViewCharacter(param);
      navigation.navigate(`NotiTabProfileDetailStack`, {
        screen: 'ProfileDetail',
        params: { routePrefix: 'NotiTab' },
      });
    }
  };

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
   */
  function setNotification() {
    if (notificationArray?.length) {
      return (
        <FlatList
          data={notificationArray}
          onEndReached={async () => {
            if (!isPageEnd) {
              const nextPageNum = pageNum + 1;
              setPageNum(nextPageNum);
              await getNotification(nextPageNum);
            }
          }}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={(obj) => (
            <NotificationItem
              notificationInfo={obj.item}
              onPress={goNavigate}
              onDelete={deleteNotification}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      );
    }
    return (
      <View style={{ alignItems: 'center' }}>
        <text.Caption textColor={colors.gray6}>
          {i18n.t('이제 확인할 알림이 없어요')}
        </text.Caption>
      </View>
    );
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
            name={isLogined ? myCharacter.name : ''}
            sub={isLogined ? i18n.t('의') : '당신의'}
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
              isPress
              name={myCharacter.name}
              profileImg={myCharacter.profile_img}
              routePrefix="NotiTab"
            />
          </AnimationImg>
        ) : null}
      </area.RowArea>

      <Animated.ScrollView
        style={{ marginTop: HEADER_MIN_HEIGHT - 30 }}
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ paddingTop: 30 + 14 }} />
        {isLogined ? (
          <>{setNotification()}</>
        ) : (
          <DefaultNotification activeOpacity={1}>
            <Svg icon="logo" size={20} />
            <View
              style={{
                flex: 2,
                marginLeft: 10,
              }}
            >
              <area.RowArea>
                <text.Body2B textColor={colors.black}>
                  Bouquet
                  <text.Body2R textColor={colors.black}>
                    이 꿈꾸던 부캐를 만들어 보자고 제안해요.
                  </text.Body2R>
                </text.Body2B>
              </area.RowArea>
            </View>
          </DefaultNotification>
        )}
      </Animated.ScrollView>
      {isLogined ? (
        <FloatingButton routePrefix="NotiTab" />
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

const DefaultNotification = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${colors.white};
  border-radius: 10;
  align-items: center;
  padding-horizontal: 18;
  padding-vertical: 12;
  margin-bottom: 10;
  margin-horizontal: 30;
`;
