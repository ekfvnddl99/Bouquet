import React from 'react';
import { View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import GoogleSignInAsync from '../../logics/server/GoogleLogin';
import useLogin from '../../logics/hooks/useLogin';

// components
import LoginButton from '../../components/button/LoginButton';
import PrimaryTextButton from '../../components/button/PrimaryTextButton';

/**
 * 웰컴 스크린
 * TODO 애플 로그인
 * @description 소셜로그인, 미리보기 등 가능
 */
export default function WelcomeScreen(): React.ReactElement {
  // safearea 밖의 공간
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [, logout] = useLogin();

  /**
   * tab이 있는 main으로 이동
   * @description 미리보기 버튼 눌렀을 때
   */
  async function goTabs() {
    await logout();
    navigation.navigate('Tab');
  }

  /**
   * '로그인' 화면으로 이동
   */
  function goLogin() {
    navigation.navigate('Login');
  }

  /**
   * '회원가입' 화면으로 이동
   */
  function goRegister() {
    navigation.navigate('Register');
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.gray0, paddingTop: insets.top }}
    >
      <area.ContainerBlank20>
        <View style={{ alignItems: 'center', marginTop: 70 }}>
          <Svg icon="logo" size={100} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Svg icon="title" size={0} />
        </View>

        <area.BottomArea>
          <LoginButton
            content={i18n.t('메일로 가입하기')}
            icon="mail"
            onPress={() => goRegister()}
          />
        </area.BottomArea>

        <area.RowArea style={{ marginTop: 15, justifyContent: 'center' }}>
          <text.Button2R textColor={colors.black}>
            {i18n.t('또는')}{' '}
          </text.Button2R>
          <PrimaryTextButton
            onPress={() => goLogin()}
            content={i18n.t('로그인')}
            isBold
          />
        </area.RowArea>
      </area.ContainerBlank20>

      <area.TextBackgroundBtnArea>
        <text.Button2B textColor={colors.black}>
          {i18n.t('우선 알아보고 싶다면')}
        </text.Button2B>
        <PrimaryTextButton
          onPress={() => goTabs()}
          content={i18n.t('미리보기')}
          isBold
        />
      </area.TextBackgroundBtnArea>
      <View style={{ backgroundColor: colors.white, height: insets.bottom }} />
    </View>
  );
}
