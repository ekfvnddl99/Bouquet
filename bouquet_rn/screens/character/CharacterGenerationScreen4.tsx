import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import useLoadCharacter from '../../logics/hooks/useLoadCharacter';

// components
import ConditionButton from '../../components/button/ConditionButton';
import NameNText from '../../components/text/NameNText';

type CharacterGenerationScreen4Props = {
  profileImg: string;
  name: string;
  isModifying: boolean;
  navigation: any;
};
/**
 * 캐릭터 생성/수정 완료됐다는 확인 화면
 *
 * @param profileImg 생성/수정될 캐릭터의 프로필 이미지
 * @param name 생성/수정될 캐릭터의 이름
 * @param isModifying 수정하냐?
 * @param navigation 돌아가기 버튼 누를 때 필요한 네비게이션 변수
 * @returns
 */
export default function CharacterGenerationScreen4({
  profileImg,
  name,
  isModifying,
  navigation,
}: CharacterGenerationScreen4Props): React.ReactElement {
  const [loadCharacter] = useLoadCharacter();
  /**
   * 해당 캐릭터의 상세 화면으로 이동하는 함수.
   * * '시작하기' 버튼을 누르면 실행됨.
   */
  const goNext = async () => {
    await loadCharacter();
    navigation.navigate('ProfileOverview');
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <elses.CircleImg
          diameter={120}
          source={{ uri: profileImg }}
          style={{ marginBottom: 16 }}
        />
        <NameNText name={name} sub="님," />
        <text.Subtitle2R textColor={colors.black}>
          {isModifying ? i18n.t('다시 피어날') : i18n.t('또 다른 모습으로')}
        </text.Subtitle2R>
        <text.Subtitle2R textColor={colors.black}>
          {isModifying
            ? i18n.t('준비가 되었어요')
            : i18n.t('피어날 준비가 되었어요')}
        </text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{ marginBottom: 16 }}>
          <ConditionButton
            height={44}
            isActive
            onPress={goNext}
            content={i18n.t('시작')}
            paddingH={0}
            paddingV={14}
          />
        </area.BottomArea>
      </area.ContainerBlank20>
    </View>
  );
}
