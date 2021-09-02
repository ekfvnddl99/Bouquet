import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';
import { useSetRecoilState, useRecoilValue } from 'recoil';

// components
import ConditionButton from '../button/ConditionButton';

import useCharacterView from '../../logics/useCharacterView';

interface ProfileCharacterItemProps {
  name: string;
  profile: string;
  introduction: string;
  id: number;
  isAccount: boolean;
  select?: number;
  press: Function;
  idx?: number;
}

export default function ProfileCharacterItem({
  name,
  profile,
  introduction,
  id,
  select,
  press,
  idx,
  isAccount,
}: ProfileCharacterItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewCharacter, setViewCharacter] = useCharacterView();
  function goProfileDetail() {
    if (id !== -1) setViewCharacter(id);
    else setViewCharacter(name);
    navigation.navigate('ProfileItem');
  }
  return (
    <button.MiniListButton
      isWidth={false}
      height={isAccount ? 200 : 238}
      backgroundColor={colors.white}
      paddingH={25}
      paddingV={18}
      style={{ alignItems: 'center', paddingBottom: 16, paddingTop: 18 }}
      activeOpacity={1}
      onPress={() => goProfileDetail}
    >
      <elses.CircleImg diameter={100} source={{ uri: profile }} />
      <View style={{ marginBottom: 8 }} />
      <text.Body2B color={colors.black}>{name}</text.Body2B>
      <View style={{ marginBottom: 8 }} />
      <text.Caption color={colors.black} numberOfLines={1}>
        {introduction}
      </text.Caption>
      {isAccount ? null : (
        <View style={{ marginTop: 21 }}>
          <ConditionButton
            isActive={!(select === id)}
            press={() => press(idx, id)}
            content={
              select === id ? i18n.t('선택된 캐릭터') : i18n.t('캐릭터 선택')
            }
            paddingH={12}
            paddingV={0}
            height={22}
          />
        </View>
      )}
    </button.MiniListButton>
  );
}
