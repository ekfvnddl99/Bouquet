import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Pressable,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';
import * as type from '../type';

// components
import ProfileButton from '../button/ProfileButton';

const TOGGLE = 20;
export default function SettingToggleItem(): React.ReactElement {
  const [isOn, setIsOn] = useState(false);

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

  function Toggle() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setIsOn(!isOn)}>
          <View
            style={{
              backgroundColor: colors.gray0,
              borderRadius: 10,
              width: 40,
              height: 20,
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: isOn ? colors.primary : colors.gray5,
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                },
                {
                  transform: [
                    { translateX: isOn ? TranslateXRight : TranslateXLeft },
                  ],
                },
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ paddingVertical: 8, paddingHorizontal: 8 }}>
      <area.RowArea>
        <ProfileButton diameter={20} />
        <View style={{ flex: 1 }} />
        <Toggle />
      </area.RowArea>
    </View>
  );
}
