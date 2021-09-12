import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';

// assets
import Icon from '../../../assets/Icon';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import { MyCharacter, noMyCharacter } from '../../../utils/types/UserTypes';
import useUser from '../../../logics/hooks/useUser';

// components
import ProfileSwipeView from './ProfileSwipeView';
import ProfileGridView from './ProfileGridView';
import FloatingButton from '../../../components/button/FloatingButton';
import useCharacterList from '../../../logics/hooks/useCharacterList';
import ProfileButton from '../../../components/button/ProfileButton';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ProfileOverviewScreen(): React.ReactElement {
  // 스와이프뷰인지
  const [isSwipe, setIsSwipe] = useState(true);
  const user = useUser();
  const [myCharacter] = useCharacter();
  const characterList = useCharacterList();
  // 의미없는 객체를 하나 넣어주기 위한 내 캐릭터 배열 복사본
  const [characterListCopy, setCharacterListCopy] =
    useState<MyCharacter[]>(characterList);
  // 그리드뷰에서 좋은 미관을 위해 홀수 개일 경우 형태를 갖추기 위해 의미없는 객체를 하나 넣어준다.
  useEffect(() => {
    if (characterListCopy.length % 2 === 1)
      setCharacterListCopy([...characterListCopy, noMyCharacter]);
  }, []);

  const navigation = useNavigation();
  // 헤더는 그리드뷰에서만 적용된다. 만약 그리드뷰 갔다가 다시 스와이프뷰로 돌아오면, 헤더 투명도는 원상복구 해야한다.
  // 헤더 투명도를 animation으로 표현하기 때문에 animation 변수인 scroll을 0으로 세팅한다.
  useEffect(() => {
    scroll.setValue(0);
  }, [isSwipe]);

  function goCharacterGeneration() {
    navigation.navigate('CharacterGeneration');
  }
  function goSetting() {
    navigation.navigate('SettingStack');
  }

  // animation에 필요한 변수들
  // animation 컨트롤 변수
  const scroll = useRef(new Animated.Value(0)).current;
  // 헤더 투명도
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

      <area.RowArea style={{ paddingHorizontal: 30, paddingVertical: 16 }}>
        <View style={{ flex: 1 }}>
          <ProfileButton
            diameter={24}
            isAccount
            isJustImg
            name={user.name}
            profileImg={user.profile_img}
          />
        </View>
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => goCharacterGeneration()}
        >
          <Icon icon="plus" size={24} />
        </TouchableOpacity>
        {isSwipe ? (
          <TouchableOpacity onPress={() => setIsSwipe(!isSwipe)}>
            <Icon icon="grid" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsSwipe(!isSwipe)}>
            <Icon icon="swipe" size={24} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => goSetting()}
        >
          <Icon icon="setting" size={24} />
        </TouchableOpacity>
      </area.RowArea>

      {isSwipe ? (
        <ProfileSwipeView characterList={characterList} />
      ) : (
        <ProfileGridView scroll={scroll} characterList={characterList} />
      )}
      {myCharacter.id === -1 ? null : <FloatingButton />}
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
