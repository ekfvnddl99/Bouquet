import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

// components
import ConditionButton from '../button/ConditionButton';

type SelectTemplateProps = {
  name: string;
  explain: string;
  svg: JSX.Element;
  selectId: number;
  setSelect: Function;
  thisId: number;
};
export default function SelectTemplateItem({
  name,
  explain,
  svg,
  selectId,
  setSelect,
  thisId,
}: SelectTemplateProps): React.ReactElement {
  const navigation = useNavigation();
  function goBack() {
    navigation.goBack();
  }
  return (
    <View style={{ marginBottom: 24 }}>
      <area.RowArea style={{ marginBottom: 12 }}>
        <text.Subtitle3 color={colors.black}>{name}</text.Subtitle3>
        <View style={{ flex: 1 }} />
        <ConditionButton
          isActive={selectId === thisId}
          press={() => [setSelect(thisId), goBack()]}
          height={22}
          paddingH={12}
          paddingV={0}
          content={
            selectId === thisId ? i18n.t('선택한 템플릿') : i18n.t('선택')
          }
        />
      </area.RowArea>
      <text.Caption color={colors.gray6} style={{ marginBottom: 12 }}>
        {explain}
      </text.Caption>
      {svg}
    </View>
  );
}
