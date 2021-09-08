import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ConditionButton from '../../components/button/ConditionButton';
import NameNText from '../../components/text/NameNText';

type CharacterGenerationScreen4Props = {
  profileImg: string;
  name: string;
  isModifying: boolean;
  navigation: any;
};
export default function CharacterGenerationScreen4({
  profileImg,
  name,
  isModifying,
  navigation,
}: CharacterGenerationScreen4Props): React.ReactElement {
  function goNext() {
    navigation.popToTop();
    navigation.navigate('ProfileDetailStack');
  }

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
            onPress={() => goNext}
            content={i18n.t('시작')}
            paddingH={0}
            paddingV={14}
          />
        </area.BottomArea>
      </area.ContainerBlank20>
    </View>
  );
}
