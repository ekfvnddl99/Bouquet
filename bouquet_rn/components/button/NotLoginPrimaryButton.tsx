import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import { HomeProps } from '../../utils/types/types';
import { userState } from '../../logics/atoms';
import { useRecoilValue } from 'recoil';

export default function NotLoginPrimaryButton() {
  const [color, setColor] = useState(colors.primary);
  const user = useRecoilValue(userState);
  const navigation = useNavigation();

  function goChaGeneration() {
    navigation.navigate('ChaGeneration');
  }
  function goLogin() {
    navigation.navigate('Login');
  }

  return (
    <TouchableOpacity
      onPressIn={() => setColor(colors.pressed_primary)}
      onPressOut={() => setColor(colors.primary)}
      activeOpacity={1}
      onPress={user.isLogined ? goChaGeneration : goLogin}
    >
      <View
        style={{
          backgroundColor: color,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <text.Button2R color={colors.white}>
          {i18n.t('여기를 눌러')}{' '}
        </text.Button2R>
        {i18n.locale == 'en' ? (
          <>
            <text.Button2R color={colors.white}>
              {i18n.t('를 만들어 보세요')}{' '}
            </text.Button2R>
            <text.Button2B color={colors.white}>
              {i18n.t('캐릭터')}!
            </text.Button2B>
          </>
        ) : (
          <>
            <text.Button2B color={colors.white}>
              {i18n.t('캐릭터')}
            </text.Button2B>
            <text.Button2R color={colors.white}>
              {i18n.t('를 만들어 보세요')}
            </text.Button2R>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
