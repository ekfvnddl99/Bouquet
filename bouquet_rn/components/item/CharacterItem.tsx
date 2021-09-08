import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import useViewCharacter from '../../logics/hooks/useViewCharacter';

// utils
import { CharacterMini } from '../../utils/types/UserTypes';

type CharacterItemProps = {
  characterInfo: CharacterMini;
};
/**
 * 캐릭터 리스트의 컴포넌트
 * @description 캐릭터 고를 때 보이는 컴포넌트
 *
 * @param characterInfo 해당 캐릭터 객체
 */
export default function CharacterItem({
  characterInfo,
}: CharacterItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewCharacter, setViewCharacter] = useViewCharacter();
  /**
   * '상세 프로필' 화면으로 이동하는 함수
   * @description 보여지는 캐릭터를 설정하고 나서 넘어간다.
   */
  function goProfileDetail() {
    setViewCharacter(characterInfo.name);
    navigation.navigate('ProfileStack');
  }

  return (
    <button.MiniListButton
      isWidth
      height={200}
      backgroundColor={colors.white}
      paddingH={18}
      paddingV={18}
      style={{ alignItems: 'center', marginRight: 10 }}
      activeOpacity={1}
      onPress={() => goProfileDetail}
    >
      <elses.CircleImg
        diameter={100}
        source={{ uri: characterInfo.profile_img }}
      />
      <View style={{ marginVertical: 8 }}>
        <text.Body2B textColor={colors.black}>{characterInfo.name}</text.Body2B>
      </View>
      <text.Caption textColor={colors.black} numberOfLines={2}>
        {characterInfo.intro}
      </text.Caption>
    </button.MiniListButton>
  );
}
