import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

// components
import ConditionButton from '../button/ConditionButton';

/**
 * '템플릿 선택 화면'에 있는 템플릿 선택지 컴포넌트
 *
 * @param templateName 템플릿 이름
 * @param explain 템플릿 설명
 * @param exampleSvg 템플릿 예시로 들어가는 svg
 * @param selectId 고른 템플릿 아이디
 * @param setSelectId 고른 템플릿 아이디 set 함수
 * @param thisId 해당 템플릿 아이디
 */
type SelectTemplateProps = {
  templateName: string;
  explain: string;
  exampleSvg: JSX.Element;
  selectId: number;
  setSelectId: (param: number) => void;
  thisId: number;
};
export default function SelectTemplateItem({
  templateName,
  explain,
  exampleSvg,
  selectId,
  setSelectId,
  thisId,
}: SelectTemplateProps): React.ReactElement {
  const navigation = useNavigation();
  /**
   * 뒤로가기 함수
   */
  function goBack() {
    navigation.goBack();
  }
  return (
    <View style={{ marginBottom: 24 }}>
      <area.RowArea style={{ marginBottom: 12 }}>
        <text.Subtitle3 textColor={colors.black}>{templateName}</text.Subtitle3>
        <View style={{ flex: 1 }} />
        <ConditionButton
          isActive={selectId === thisId}
          onPress={() => [setSelectId(thisId), goBack()]}
          height={22}
          paddingH={12}
          paddingV={0}
          content={
            selectId === thisId ? i18n.t('선택한 템플릿') : i18n.t('선택')
          }
        />
      </area.RowArea>
      <text.Caption textColor={colors.gray6} style={{ marginBottom: 12 }}>
        {explain}
      </text.Caption>
      {exampleSvg}
    </View>
  );
}
