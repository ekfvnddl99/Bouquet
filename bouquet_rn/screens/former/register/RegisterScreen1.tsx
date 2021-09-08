import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WelcomeStackParam } from '../../../utils/types/NavigationTypes';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

import { checkEmailAsync } from '../../../logics/server/EmailLogin';

// components
import ConditionButton from '../../../components/button/ConditionButton';
import PrimaryTextButton from '../../../components/button/PrimaryTextButton';
import WarningText from '../../../components/text/WarningText';
import ConditionTextInput from '../../../components/input/ConditionTextInput';
import LineButton from '../../../components/button/LineButton';

type RegisterScreenProps = {
  onPress: () => void;
  email: string;
  setEmail: (param: string) => void;
  authNumber: number;
  setAuthNumber: (param: number) => void;
};
/**
 * 회원가입 첫 번째 화면.
 * @description 이메일 입력 + 인증번호 입력
 *
 * @param onPress 그 다음으로 가기 위한 버튼 눌렀을 때 시행되는 함수
 * @param email 이메일 변수
 * @param setEmail 이메일 set 함수
 * @param authNumber 인증번호 변수
 * @param setAuthNumber 인증번호 set 함수
 * @returns
 */
export default function RegisterScreen1({
  onPress,
  email,
  setEmail,
  authNumber,
  setAuthNumber,
}: RegisterScreenProps): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<WelcomeStackParam>>();
  // 모든 조건이 만족됐는지 확인하기 위한 state
  const [IsOK, setIsOK] = useState(false);
  // 해당 textinput에 focus가 있는지 확인하기 위한 state
  const [IsFocus, setFocus] = useState(false);
  //
  const [next, setNext] = useState(false);

  // 이메일 입력 조건을 체크하는 배열
  const [emailConditionArray, setEmailConditionArray] = useState([
    false,
    false,
  ]);
  // 인증번호 입력 조건을 체크하는 배열
  const [authNumberConditionArray, setAuthNumberConditionArray] = useState([
    false,
    false,
  ]);
  // 조건을 만족하지 못했을 때 뜨는 에러메세지
  const errText = [
    '메일을 입력해 주세요.',
    '메일 형식대로 입력해야 해요.',
    '메일을 인증해 주세요.',
    '인증 번호를 입력해 주세요.',
    '인증 번호가 틀렸나 봐요.',
  ];
  // 이메일 정규표현식
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  /**
   * 이메일 조건을 확인하는 함수
   * @description email 값이 바뀔 때마다 실행된다.
   * @param textInput 입력되는 이메일 값
   */
  function checkEmail(textInput: string) {
    setEmail(textInput);
    const tmpArray = [...emailConditionArray];
    // 조건 다 통과했는데, 다시 이메일을 입력하는 경우
    if (IsOK) {
      setNext(false);
      setAuthNumber(-1);
    }
    if (email.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    if (emailRegex.test(email)) tmpArray[1] = true;
    else tmpArray[1] = false;
    setEmailConditionArray(tmpArray);
  }

  /**
   * 이메일 인증을 확인하는 함수
   */
  async function checkEmailAuthentication() {
    const serverResult = await checkEmailAsync(email);
    if (emailConditionArray[0] && emailConditionArray[1]) {
      if (serverResult.isSuccess) setNext(true);
      else alert(serverResult.result.errorMsg);
    }
  }

  /**
   * 인증번호를 확인하는 함수
   * @param textInput 입력되는 인증번호 값
   */
  function checkAuthNumber(textInput: string) {
    setAuthNumber(Number(textInput));
    const tmpArray = [...authNumberConditionArray];
    if (authNumber.toString.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    if (authNumber === 1234) tmpArray[1] = true;
    else tmpArray[1] = false;
    setAuthNumberConditionArray(tmpArray);
  }

  /**
   * 매번 모든 조건이 다 충족됐는지 확인
   */
  useEffect(() => {
    if (
      emailConditionArray.includes(false) ||
      authNumberConditionArray.includes(false)
    )
      setIsOK(false);
    else setIsOK(true);
  });

  /**
   * '로그인' 화면으로 이동하는 함수
   * @description '뒤로가기' 버튼 눌렀을 때
   */
  function goLogin() {
    navigation.pop();
    navigation.navigate('Login');
  }

  return (
    <area.ContainerBlank20>
      <area.FormArea
        height="44"
        style={
          IsFocus && !(emailConditionArray[0] && emailConditionArray[1])
            ? { borderWidth: 1, borderColor: colors.warning_red }
            : null
        }
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder={i18n.t('메일')}
          keyboardType="email-address"
          onChangeText={(textInput: string) => checkEmail(textInput)}
          value={email}
          onFocus={() => setFocus(true)}
        />
        <LineButton
          content={i18n.t('메일 인증')}
          onPress={() => checkEmailAuthentication}
          borderColor={colors.black}
        />
      </area.FormArea>
      {IsFocus && !(emailConditionArray[0] && emailConditionArray[1]) ? (
        <WarningText
          content={!emailConditionArray[0] ? errText[0] : errText[1]}
          marginTop={8}
        />
      ) : null}

      {authNumber.toString.length > 0 || next ? (
        <View style={{ marginTop: 16 }}>
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('메일 인증 번호')}
            onChangeText={(textInput: string) => checkAuthNumber(textInput)}
            keyboardType="numeric"
            isWarning={
              !(authNumberConditionArray[0] && authNumberConditionArray[1])
            }
            textValue={authNumber.toString()}
            warnText={!authNumberConditionArray[0] ? errText[3] : errText[4]}
          />
        </View>
      ) : null}

      <area.BottomArea>
        <View style={{ alignItems: 'center' }}>
          <text.Caption textColor={colors.gray6}>
            {i18n.t('이전 페이지로 돌아가면 소셜 계정으로도 가입할 수 있어요')}
          </text.Caption>
        </View>

        <View style={{ marginVertical: 16 }}>
          <ConditionButton
            isActive={IsOK}
            onPress={() => (IsOK ? onPress : {})}
            content={i18n.t('메일로 계속하기')}
            paddingH={0}
            paddingV={14}
            height={45}
          />
        </View>

        <area.RowArea style={{ marginBottom: 16 }}>
          <text.Body2R textColor={colors.black}>
            {i18n.t('계정이 이미 있다면')}{' '}
          </text.Body2R>
          <PrimaryTextButton
            onPress={() => goLogin}
            content={i18n.t('로그인')}
            isBold
          />
        </area.RowArea>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
