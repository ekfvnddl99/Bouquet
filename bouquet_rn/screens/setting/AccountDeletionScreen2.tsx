import React from 'react';
import { View, StyleSheet } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import useLogin from '../../logics/hooks/useLogin';

// components
import ConditionButton from '../../components/button/ConditionButton';
import NameNText from '../../components/text/NameNText';
import useUser from '../../logics/hooks/useUser';

export default function AccountDeletionScreenTwo(): React.ReactElement {
  const [, logout] = useLogin();
  const user = useUser();
  async function goOut() {
    await logout();
  }

  return (
    <area.Container>
      <area.ContainerBlank20>
        <text.Subtitle1
          textColor={colors.black}
          style={{ marginBottom: 32, marginTop: 10 }}
        >
          {i18n.t('계정 삭제 완료')}
        </text.Subtitle1>

        <View style={styles.middleArea}>
          <elses.CircleImg
            diameter={120}
            source={{ uri: user.profile_img }}
            style={{ marginBottom: 16 }}
          />
          <NameNText name={user.name} sub={`${i18n.t('님')},`} />
          <text.Subtitle2R textColor={colors.black}>
            {i18n.t('Bouquet에서 피어난')}
          </text.Subtitle2R>
          <text.Subtitle2R textColor={colors.black}>
            {i18n.t('새로운 모습이')}
          </text.Subtitle2R>
          <text.Subtitle2R textColor={colors.black}>
            {i18n.t('아름다웠습니다-계정')}
          </text.Subtitle2R>
        </View>

        <area.BottomArea style={{ marginBottom: 16 }}>
          <ConditionButton
            height={44}
            isActive
            onPress={() => goOut()}
            content={i18n.t('완료')}
            paddingH={0}
            paddingV={14}
          />
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}

const styles = StyleSheet.create({
  middleArea: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
