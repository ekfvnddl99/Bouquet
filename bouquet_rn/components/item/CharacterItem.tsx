import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import useCharacterView from '../../logics/hooks/useCharacterView';

// utils
import { Character } from '../../utils/types/UserTypes';

type CharacterItemProps = {
  character: Character;
};
/**
 * 캐릭터 리스트의 컴포넌트
 * 캐릭터 고를 때 보이는 컴포넌트
 *
 * @param character 캐릭터 unit
 */
export default function CharacterItem({
  character,
}: CharacterItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewCharacter, setViewCharacter] = useCharacterView();
  /**
   * '상세 프로필' 화면으로 이동하는 함수
   * 보여지는 캐릭터를 설정하고 나서 넘어간다.
   */
  function goProfileDetail() {
    setViewCharacter(character.name);
    navigation.navigate('ProfileItem');
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
      <elses.CircleImg diameter={100} source={{ uri: character.profile_img }} />
      <View style={{ marginVertical: 8 }}>
        <text.Body2B textColor={colors.black}>{character.name}</text.Body2B>
      </View>
      <text.Caption textColor={colors.black} numberOfLines={2}>
        {character.intro}
      </text.Caption>
    </button.MiniListButton>
  );
}
