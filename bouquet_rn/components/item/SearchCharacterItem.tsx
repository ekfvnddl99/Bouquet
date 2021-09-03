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

/**
 * Search에 보이는 캐릭터 리스트 컴포넌트
 *
 * @param character 해당 캐릭터
 */
type SearchCharacterItemProps = {
  character: Character;
};
export default function SearchCharacterItem({
  character,
}: SearchCharacterItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewCharacter, setViewCharacter] = useCharacterView();

  function goProfileDetail() {
    setViewCharacter(character.name);
    navigation.navigate('ProfileDetailStack');
  }

  return (
    <button.MiniListButton
      isWidth
      height={200}
      backgroundColor={colors.white}
      paddingH={18}
      paddingV={18}
      style={{ alignItems: 'center', marginRight: 10 }}
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
