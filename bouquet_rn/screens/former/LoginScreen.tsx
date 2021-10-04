import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';

// assets
import Svg from '../../assets/Icon';

// logics
import GoogleSignInAsync from '../../logics/server/GoogleLogin';
import { loginEmailAsync } from '../../logics/server/EmailLogin';
import useLogin from '../../logics/hooks/useLogin';

// components
import LoginButton from '../../components/button/LoginButton';
import BackButton from '../../components/button/BackButton';
import ConditionButton from '../../components/button/ConditionButton';
import PrimaryTextButton from '../../components/button/PrimaryTextButton';
import WarningText from '../../components/text/WarningText';

/**
 * '로그인' 화면
 * TODO 애플 로그인
 * TODO 비밀번호 찾기
 * @returns 로그인 화면
 */
export default function LoginScreen(): React.ReactElement {
  // safearea 밖의 공간
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [login] = useLogin();

  // TextInput으로 받는 정보를 저장하는 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 에러 메세지
  const [err, setErr] = useState('');
  // 비밀번호 * 처리 할 건지 아닌지
  const [isShowing, setIsShowing] = useState(false);

  /**
   * 'tab'으로 이동
   * @description 미리보기
   */
  function goTabs() {
    navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
  }

  /**
   * '회원가입' 화면으로 이동
   */
  function goRegister() {
    navigation.navigate('Register');
  }

  /**
   * '비밀번호 재설정' 화면으로 이동
   */
  function goFindPassword() {
    navigation.navigate('FindPassword');
  }

  /**
   * 로그인하는 서버 함수
   */
  async function emailLogin() {
    const serverResult = await loginEmailAsync(email, password);
    if (serverResult.isSuccess) {
      await SecureStore.setItemAsync('auth', serverResult.result);
      await login();
      goTabs();
    } else {
      setErr(serverResult.result.errorMsg);
    }
  }

  /**
   * 비밀번호 * 처리 된 걸 보여주는지 아닌지
   * @param isOpenEye 눈 뜬 아이콘인지 아닌지
   * @returns
   */
  function setEyeIcon(isOpenEye: boolean) {
    if (isOpenEye) {
      return <Svg icon="eyeFocus" size={20} />;
    }
    return <Svg icon="eye" size={18} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.gray0,
          paddingTop: insets.top,
        }}
      >
        <area.ContainerBlank20>
          <ScrollView keyboardShouldPersistTaps="handled">
            <BackButton />
            <View style={{ marginTop: 30 }} />

            <text.Subtitle1 textColor={colors.black}>
              {i18n.t('로그인')}
            </text.Subtitle1>
            <View style={{ marginTop: 32 }} />

            <input.FormInput
              height={44}
              placeholder={i18n.t('메일')}
              onChangeText={(textInput: string) => setEmail(textInput)}
              keyboardType="email-address"
            />

            <area.FormArea height="44" style={{ marginTop: 16 }}>
              <TextInput
                style={{ flex: 1 }}
                placeholder={i18n.t('비밀번호')}
                secureTextEntry={!isShowing}
                onChangeText={(textInput: string) => setPassword(textInput)}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsShowing(!isShowing);
                }}
              >
                {setEyeIcon(isShowing)}
              </TouchableOpacity>
            </area.FormArea>

            <View style={{ alignItems: 'center' }}>
              {err ? <WarningText content={err} marginTop={16} /> : null}
              <View style={{ marginTop: 16 }}>
                <ConditionButton
                  isActive
                  onPress={() => emailLogin()}
                  content={i18n.t('로그인')}
                  paddingH={40}
                  paddingV={14}
                  height={45}
                />
              </View>
            </View>

            <area.RowArea style={{ marginTop: 16, justifyContent: 'center' }}>
              <text.Caption textColor={colors.black}>
                {i18n.t('비밀번호를 잊었나요')}{' '}
              </text.Caption>
              <PrimaryTextButton
                onPress={() => goFindPassword()}
                content={i18n.t('비밀번호 찾기')}
                isBold={false}
              />
            </area.RowArea>
          </ScrollView>

          <area.BottomArea style={{ overflow: 'hidden' }}>
            <area.RowArea
              style={{
                marginTop: 15,
                overflow: 'hidden',
                justifyContent: 'center',
              }}
            >
              <text.Body2R textColor={colors.black}>
                {i18n.t('계정이 없다면')}{' '}
              </text.Body2R>
              <PrimaryTextButton
                onPress={() => goRegister()}
                content={i18n.t('회원가입')}
                isBold
              />
            </area.RowArea>
          </area.BottomArea>
        </area.ContainerBlank20>

        <area.TextBackgroundBtnArea style={{ overflow: 'hidden' }}>
          <text.Body2R textColor={colors.black}>
            {i18n.t('우선 알아보고 싶다면')}{' '}
          </text.Body2R>
          <PrimaryTextButton
            onPress={() => goTabs()}
            content={i18n.t('미리보기')}
            isBold
          />
          <View style={{ height: 1 }} />
        </area.TextBackgroundBtnArea>

        <View
          style={{
            paddingBottom: insets.bottom,
            backgroundColor: colors.white,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
