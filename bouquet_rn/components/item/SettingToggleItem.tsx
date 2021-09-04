import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// logics
import useCharacter from '../../logics/hooks/useCharacter';

// components
import ProfileButton from '../button/ProfileButton';

/**
 * 알람 설정을 위한 toggle 컴포넌트
 */
export default function SettingToggleItem(): React.ReactElement {
  const [isOn, setIsOn] = useState(false);
  const [character, setCharacter] = useCharacter();

  /**
   * toggle의 animation 관련
   * TODO 알람 set 함수
   *
   * TOGGLE 토글 움직이는 정도
   * drag animation 변수
   * TranslateXLeft x축의 왼쪽 방향으로 움직이는 animation
   * TranslateXRight x축의 오른쪽 방향으로 움직이는 animation
   */
  const TOGGLE = 20;
  const drag = useRef(new Animated.Value(0)).current;
  const TranslateXLeft = drag.interpolate({
    inputRange: [-1, 0],
    outputRange: [0, TOGGLE],
    extrapolate: 'clamp',
  });
  const TranslateXRight = drag.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TOGGLE],
    extrapolate: 'clamp',
  });

  // toggle의 on/off를 관여하는 함수
  // 색 변화, 토글 공 위치 변화
  function Toggle() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setIsOn(!isOn)}>
          <ToggleArea>
            <ToggleBall
              style={[
                {},
                {
                  transform: [
                    { translateX: isOn ? TranslateXRight : TranslateXLeft },
                  ],
                },
              ]}
            />
          </ToggleArea>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ paddingVertical: 8, paddingHorizontal: 8 }}>
      <area.RowArea>
        <ProfileButton
          diameter={20}
          isAccount={false}
          name={character.name}
          img={character.profileImg}
        />
        <View style={{ flex: 1 }} />
        <Toggle />
      </area.RowArea>
    </View>
  );
}

const ToggleArea = styled.View`
  background-color: ${colors.gray0};
  border-radius: 10;
  width: 40;
  height: 20;
`;
const ToggleBall = styled(Animated.View)`
  background-color: ${colors.gray0};
  border-radius: 10;
  width: 40;
  height: 20;
`;
