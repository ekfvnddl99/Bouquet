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

type CharacterDeletionScreen1Props = {
  profileImg: string;
  name: string;
  onPress: () => void;
};
export default function CharacterDeletionScreen1({
  profileImg,
  name,
  onPress,
}: CharacterDeletionScreen1Props): React.ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <elses.CircleImg
          diameter={120}
          source={{ uri: profileImg }}
          style={{ marginBottom: 16 }}
        />
        <text.Subtitle2R textColor={colors.black}>
          {i18n.t('정말로')}
        </text.Subtitle2R>
        <NameNText name={name} sub={i18n.t('님을')} />
        <text.Subtitle2R textColor={colors.black}>
          {i18n.t('삭제하시겠어요')}
        </text.Subtitle2R>
      </View>

      <area.BottomArea style={{ marginBottom: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <text.Caption textColor={colors.gray6} style={{ marginBottom: 16 }}>
            {i18n.t('아쉽지만 캐릭터는 삭제하면 복구하지 못해요')}
          </text.Caption>
        </View>
        <ConditionButton
          height={44}
          isActive
          onPress={onPress}
          content={i18n.t('캐릭터 삭제')}
          paddingH={0}
          paddingV={14}
        />
      </area.BottomArea>
    </View>
  );
}
