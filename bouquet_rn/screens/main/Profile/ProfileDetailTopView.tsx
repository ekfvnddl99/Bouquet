import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import i18n from 'i18n-js';
// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// components
import ProfileDetailItem from '../../../components/item/ProfileDetailItem';

type ProfileDetailTopViewProps = {
  routePrefix: string;
  arrayLength: number;
  tabIndex: number;
  setTabIndex: (param: number) => void;
};
export default function ProfileDetailTopView({
  routePrefix,
  arrayLength,
  tabIndex,
  setTabIndex,
}: ProfileDetailTopViewProps): React.ReactElement {
  return (
    <View style={{ paddingTop: 20 }}>
      <ProfileDetailItem isMini={false} routePrefix={routePrefix} />

      <View style={{ marginTop: 30 }} />
      <area.RowArea>
        <TouchableOpacity onPress={() => setTabIndex(0)}>
          <text.Subtitle3
            textColor={tabIndex === 0 ? colors.black : colors.gray5}
          >
            {i18n.t('게시글')}
          </text.Subtitle3>
        </TouchableOpacity>
        <View style={{ marginRight: 16 }} />
        <TouchableOpacity onPress={() => setTabIndex(1)}>
          <text.Subtitle3
            textColor={tabIndex === 1 ? colors.black : colors.gray5}
          >
            {i18n.t('질문')}
          </text.Subtitle3>
        </TouchableOpacity>
      </area.RowArea>
      <area.RowArea style={{ marginTop: 16 }}>
        <text.Body2R textColor={colors.black}>{i18n.t('총')} </text.Body2R>
        <text.Body2B textColor={colors.black}>{arrayLength}</text.Body2B>
        <text.Body2R textColor={colors.black}>{i18n.t('개')}</text.Body2R>
      </area.RowArea>
      <View style={{ marginTop: 16 }} />
    </View>
  );
}
