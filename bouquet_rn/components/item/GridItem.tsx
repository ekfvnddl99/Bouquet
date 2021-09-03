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
import useCharacterView from '../../logics/hooks/useCharacterView';

// components
import ConditionButton from '../button/ConditionButton';

/**
 * Profile, Account의 grid view의 캐릭터 컴포넌트
 *
 * @param name 캐릭터 이름
 * @param img 캐릭터 이미지
 * @param introduction 캐릭터 한 줄 소개
 * @param idx grid view의 항목 중 해당 캐릭터의 인덱스
 * @param isAccount '계정' 화면의 grid view인지 아닌지
 * @param onPress 캐릭터 컴포넌트 눌렀을 때 실행되는 함수
 */
interface GridItemProps {
  name: string;
  img: string;
  introduction: string;
  idx: number;
  isAccount: boolean;
  onPress: (param: number) => void;
}
export default function GridItem({
  name,
  img,
  introduction,
  onPress,
  idx,
  isAccount,
}: GridItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [character, setCharacter] = useCharacter();
  const [viewCharacter, setViewCharacter] = useCharacterView();
  /**
   * '상세 프로필' 화면으로 이동하는 함수
   */
  function goProfileDetail() {
    setViewCharacter(name);
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
      <elses.CircleImg diameter={100} source={{ uri: img }} />
      <View style={{ marginBottom: 8 }} />
      <text.Body2B textColor={colors.black}>{name}</text.Body2B>
      <View style={{ marginBottom: 8 }} />
      <text.Caption textColor={colors.black} numberOfLines={1}>
        {introduction}
      </text.Caption>
      {isAccount ? null : (
        <View style={{ marginTop: 21 }}>
          <ConditionButton
            isActive={!(character.id === idx)}
            onPress={() => onPress(idx)}
            content={
              character.id === idx
                ? i18n.t('선택된 캐릭터')
                : i18n.t('캐릭터 선택')
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
