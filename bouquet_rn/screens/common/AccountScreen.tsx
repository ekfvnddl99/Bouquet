import React, { useRef, useEffect, useState } from 'react';
import { FlatList, View, Animated } from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import * as cal from '../../logics/non-server/Calculation';
import useViewUser from '../../logics/hooks/useViewUser';

// utils
import { noMyCharacter, MyCharacter } from '../../utils/types/UserTypes';

// components
import GridCharacterItem from '../../components/item/GridCharacterItem';
import BoldNRegularText from '../../components/text/BoldNRegularText';
import HeaderItem from '../../components/item/HeaderItem';
import useCharacter from '../../logics/hooks/useCharacter';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

/**
 * '계정' 화면
 * @returns
 */
export default function AccountScreen(): React.ReactElement {
  const [myCharacter] = useCharacter();
  const [viewUser] = useViewUser();
  // 해당 계정의 캐릭터들을 담는 배열
  const [characterArray, setCharacterArray] = useState<MyCharacter[]>();

  // 캐릭터가 홀수 개일 때 grid가 이상하게 나오지 않도록 하나를 더 끼워준다.
  useEffect(() => {
    if (characterArray) {
      if (characterArray.length % 2 === 1)
        setCharacterArray([...characterArray, noMyCharacter]);
    }
  }, []);

  /**
   * scroll - animation 변수
   * OpacityHeader - 헤더 투명도
   */
  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />

      <HeaderItem
        isAccount
        isBackButton
        name={myCharacter.name}
        profileImg={myCharacter.profile_img}
      />

      <Animated.ScrollView
        contentContainerStyle={{ marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ paddingTop: 20 }} />

        <area.NoHeightArea
          marBottom={30}
          paddingH={20}
          paddingV={20}
          style={{ alignItems: 'center' }}
        >
          <elses.CircleImg
            diameter={120}
            source={{
              uri: viewUser.user_info.profile_img,
            }}
          />
          <text.Subtitle2B
            textColor={colors.black}
            style={{ marginVertical: 8 }}
          >
            {viewUser.user_info.name}
          </text.Subtitle2B>
          <area.RowArea style={{ justifyContent: 'center' }}>
            <BoldNRegularText
              boldContent={cal
                .numName(viewUser.user_info.num_followers)
                .toString()}
              regularContent={i18n.t('팔로워')}
              textColor={colors.primary}
              isCenter
            />
            <View style={{ marginRight: 32 }} />
            <BoldNRegularText
              boldContent={viewUser.user_info.num_characters.toString()}
              regularContent={
                i18n.t('캐릭터') + (i18n.locale === 'en' ? 's' : '')
              }
              textColor={colors.primary}
              isCenter
            />
          </area.RowArea>
        </area.NoHeightArea>

        <text.Subtitle3 textColor={colors.black} style={{ marginBottom: 16 }}>
          {i18n.t('캐릭터')}
        </text.Subtitle3>

        <area.RowArea style={{ marginBottom: 12 }}>
          <text.Body2R textColor={colors.black}>{i18n.t('총')} </text.Body2R>
          <text.Body2B textColor={colors.black}>
            {viewUser.user_info.num_characters.toString()}
          </text.Body2B>
          <text.Body2R textColor={colors.black}>{i18n.t('명')}</text.Body2R>
        </area.RowArea>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ justifyContent: 'center' }}
          data={characterArray}
          keyExtractor={(item) => item.name.toString()}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={(obj) => (
            <View style={{ flex: 0.5, marginBottom: 13, marginHorizontal: 8 }}>
              {obj.item.name === '' ? (
                <View />
              ) : (
                <GridCharacterItem characterInfo={obj.item} isAccount />
              )}
            </View>
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
  height: ${HEADER_MIN_HEIGHT}+${StatusBarHeight};
  border-radius: 15;
`;
