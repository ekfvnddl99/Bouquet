import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  FlatList,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { useRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import * as cal from '../../logics/non-server/Calculation';
import useUser from '../../logics/hooks/useUser';
import useUserView from '../../logics/hooks/useUserView';
import { characterListState } from '../../logics/atoms';

// utils
import { Character } from '../../utils/types/UserTypes';

// components
import GridCharacterItem from '../../components/item/GridCharacterItem';
import BoldNRegularText from '../../components/text/BoldNRegularText';
import HeaderItem from '../../components/item/HeaderItem';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type AccountScreenProps = {
  characterInfo: Character;
};
export default function AccountScreen({
  characterInfo,
}: AccountScreenProps): React.ReactElement {
  const [characterList, setCharacterList] = useRecoilState(characterListState);
  const [chaList, setChaList] = useState<Character[]>(characterList);
  const [numberOfCharacter, setNumberOfCharacter] = useState(0);
  const [viewUser, setViewUser, isMe] = useUserView();
  const user = useUser();

  useEffect(() => {
    setNumberOfCharacter(characterList.length);
    if (chaList.length % 2 === 1) setChaList([...chaList]);
  }, []);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const getTotalFollowers = useCallback(() => {
    let cnt = 0;
    if (isMe) {
      characterList.map((obj) => {
        cnt += obj.num_followers ? obj.num_followers : 0;
        return true;
      });
    } else {
      viewUser.characters.map((obj) => {
        cnt += obj.num_followers ? obj.num_followers : 0;
        return true;
      });
    }
    return cnt;
  }, [isMe, characterList, viewUser]);
  const totalFollowers = useMemo(
    () => getTotalFollowers(),
    [getTotalFollowers],
  );

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />

      <HeaderItem
        isAccount
        isBackButton
        name={characterInfo.name}
        profileImg={characterInfo.profile_img}
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
              uri:
                isMe && user !== undefined
                  ? user.profile_img
                  : viewUser.profileImg,
            }}
          />
          <text.Subtitle2B
            textColor={colors.black}
            style={{ marginVertical: 8 }}
          >
            {isMe && user !== undefined ? user.name : viewUser.name}
          </text.Subtitle2B>
          <area.RowArea style={{ justifyContent: 'center' }}>
            <BoldNRegularText
              boldContent={cal.numName(totalFollowers).toString()}
              regularContent={i18n.t('팔로워')}
              textColor={colors.primary}
              isCenter
            />
            <View style={{ marginRight: 32 }} />
            <BoldNRegularText
              boldContent={
                isMe
                  ? characterList.length.toString()
                  : viewUser.characters.length.toString()
              }
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
            {isMe ? numberOfCharacter : viewUser.characters.length.toString()}
          </text.Body2B>
          <text.Body2R textColor={colors.black}>{i18n.t('명')}</text.Body2R>
        </area.RowArea>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ justifyContent: 'center' }}
          data={isMe ? characterList : viewUser.characters}
          keyExtractor={(item) => item.name.toString()}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={(obj) => (
            <View style={{ flex: 0.5, marginBottom: 13, marginHorizontal: 8 }}>
              {obj.item.name === '' ? (
                <View />
              ) : (
                <TouchableWithoutFeedback>
                  <GridCharacterItem characterInfo={characterInfo} isAccount />
                </TouchableWithoutFeedback>
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
