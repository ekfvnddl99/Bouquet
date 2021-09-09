import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as elses from '../../../styles/styled-components/elses';

// assets
import Icon from '../../../assets/Icon';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import { MyCharacter, noMyCharacter } from '../../../utils/types/UserTypes';

// components
import ProfileSwipeView from './ProfileSwipeView';
import ProfileGridView from './ProfileGridView';
import FloatingButton from '../../../components/button/FloatingButton';
import useCharacterList from '../../../logics/hooks/useCharacterList';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ProfileOverviewScreen(): React.ReactElement {
  const [swipe, setSwipe] = useState(1);
  const [myCharacter] = useCharacter();
  const characterList = useCharacterList();
  const [chaList, setChaList] = useState<MyCharacter[]>(characterList);
  useEffect(() => {
    if (chaList.length % 2 === 1) setChaList([...chaList, noMyCharacter]);
  }, []);

  const navigation = useNavigation();
  useEffect(() => {
    scroll.setValue(0);
  });
  const goChaGeneration = () => {
    navigation.navigate('CharacterGeneration');
  };
  const goSetting = () => {
    navigation.navigate('SettingStack');
  };

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

      <area.RowArea style={{ paddingHorizontal: 30, paddingVertical: 16 }}>
        <View style={{ flex: 1 }}>
          <elses.CircleImg
            diameter={24}
            source={{ uri: myCharacter.profile_img }}
          />
        </View>
        <TouchableOpacity style={{ marginRight: 16 }} onPress={goChaGeneration}>
          <Icon icon="plus" size={24} />
        </TouchableOpacity>
        {swipe === 1 ? (
          <TouchableOpacity onPress={() => setSwipe(0)}>
            <Icon icon="grid" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setSwipe(1)}>
            <Icon icon="swipe" size={24} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{ marginLeft: 16 }} onPress={goSetting}>
          <Icon icon="setting" size={24} />
        </TouchableOpacity>
      </area.RowArea>

      {swipe === 1 ? (
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
