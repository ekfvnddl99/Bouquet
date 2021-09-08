import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import useCharacter from '../../logics/hooks/useCharacter';
import useViewCharacter from '../../logics/hooks/useViewCharacter';

// components
import ConditionButton from '../button/ConditionButton';

// utils
import { MyCharacter } from '../../utils/types/UserTypes';

interface GridCharacterItemProps {
  characterInfo: MyCharacter;
  isAccount: boolean;
  onPress?: (param: number) => void;
}
/**
 * Profile, Account의 grid view의 캐릭터 컴포넌트
 *
 * @param characterInfo 해당 캐릭터 객체
 * @param isAccount '계정' 화면의 grid view인지 아닌지
 * @param onPress 캐릭터 컴포넌트 눌렀을 때 실행되는 함수
 */
export default function GridCharacterItem({
  characterInfo,
  onPress,
  isAccount,
}: GridCharacterItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [myCharacter] = useCharacter();
  const [, setViewCharacter] = useViewCharacter();
  /**
   * '상세 프로필' 화면으로 이동하는 함수
   */
  async function goProfileDetail() {
    await setViewCharacter(characterInfo.name);
    navigation.navigate('ProfileDetailStack');
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
      <elses.CircleImg
        diameter={100}
        source={{ uri: characterInfo.profile_img }}
      />
      <View style={{ marginBottom: 8 }} />
      <text.Body2B textColor={colors.black}>{characterInfo.name}</text.Body2B>
      <View style={{ marginBottom: 8 }} />
      <text.Caption textColor={colors.black} numberOfLines={1}>
        {characterInfo.intro}
      </text.Caption>
      {!isAccount && onPress ? (
        <View style={{ marginTop: 21 }}>
          <ConditionButton
            isActive={!(myCharacter.id === characterInfo.id)}
            onPress={() => onPress(characterInfo.id ? characterInfo.id : -1)}
            content={
              myCharacter.id === characterInfo.id
                ? i18n.t('선택된 캐릭터')
                : i18n.t('캐릭터 선택')
            }
            paddingH={12}
            paddingV={0}
            height={22}
          />
        </View>
      ) : null}
    </button.MiniListButton>
  );
}
