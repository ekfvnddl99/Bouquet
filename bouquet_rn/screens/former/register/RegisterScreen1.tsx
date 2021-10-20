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

// logics
import { checkEmailAsync } from '../../../logics/server/EmailLogin';
import {
  checkExistingEmailAsync,
  checkNewEmailAsync,
} from '../../../logics/server/Auth';

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
  authNumber: string;
  setAuthNumber: (param: string) => void;
  realAuthNumber: string;
  setRealAuthNumber: (param: string) => void;
  isFindPassword?: boolean;
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
 * @param isFindPassword 비밀번호 재설정 상황인지
 * @returns
 */
export default function RegisterScreen1({
  onPress,
  email,
  setEmail,
  authNumber,
  setAuthNumber,
  realAuthNumber,
  setRealAuthNumber,
  isFindPassword,
}: RegisterScreenProps): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<WelcomeStackParam>>();
  // 모든 조건이 만족됐는지 확인하기 위한 state
  const [isOK, setIsOK] = useState(false);
  // 해당 textinput에 focus가 있는지 확인하기 위한 state
  const [isFocus, setIsFocus] = useState(false);
  // 인증번호 입력창이 뜰 조건을 만족했는지 아닌지
  const [isNext, setIsNext] = useState<boolean>(email.length > 0);
  // 메일 인증 버튼 누른 후 버튼 색
  const [mailButtonColor, setMailButtonColor] = useState(
    authNumber.length !== 0 ? colors.gray2 : colors.black,
  );

  // 이메일 입력 조건을 체크하는 배열
  const [emailConditionArray, setEmailConditionArray] = useState([
    false,
    false,
    false,
    false,
  ]);
  // 인증번호 입력 조건을 체크하는 배열
  const [authNumberConditionArray, setAuthNumberConditionArray] = useState([
    false,
    false,
  ]);
  // 이메일 에러 메세지
  const [emailErr, setEmailErr] = useState('');
  // 인증번호 에러 메세지
  const [authNumberErr, setAuthNumberErr] = useState('');
  // 조건을 만족하지 못했을 때 뜨는 에러메세지
  const errTextArray = [
    '메일을 입력해 주세요.',
    '메일 형식대로 입력해야 해요.',
    '중복된 메일이에요.',
    '메일을 인증해 주세요.',
    '인증 번호를 입력해 주세요.',
    '인증 번호가 틀렸나 봐요.',
    '없는 메일이에요.',
  ];
  // 이메일 정규표현식
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  /**
   * 이메일 조건을 확인하는 함수
   * @description email 값이 바뀔 때마다 실행된다.
   */
  useEffect(() => {
    async function checkEmail(arr: boolean[]) {
      // 메일 입력했다가 다 지우면 '메일 입력하라'는 에러 메세지가 떠야하는데 안 떠서 여기 넣음
      if (!tmpArray[0]) setEmailErr(errTextArray[0]);
      const serverResult = await checkEmailAsync(email);
      if (serverResult.isSuccess) {
        const value = !serverResult.result && email.length > 0;
        if (!tmpArray[0]) setEmailErr(errTextArray[0]);
        else if (!tmpArray[1]) setEmailErr(errTextArray[1]);
        else if (isFindPassword && value) setEmailErr(errTextArray[6]);
        else if (isFindPassword === undefined && !value)
          setEmailErr(errTextArray[2]);
        else if (!tmpArray[3]) setEmailErr(errTextArray[3]);
        else setEmailErr('');
        if (isFindPassword)
          setEmailConditionArray([arr[0], arr[1], !value, arr[3]]);
        else setEmailConditionArray([arr[0], arr[1], value, arr[3]]);
      }
    }
    const tmpArray = [...emailConditionArray];
    // 조건 다 통과했는데, 다시 이메일을 입력하는 경우.
    // step 2에서 다시 돌아온 경우.
    if (isOK) {
      setIsNext(false);
      setAuthNumber('');
      setRealAuthNumber('');
      setMailButtonColor(colors.black);
    }
    tmpArray[0] = email.length > 0;
    tmpArray[1] = emailRegex.test(email);
    tmpArray[3] = isNext;
    checkEmail(tmpArray);
    setEmailConditionArray(tmpArray);
  }, [email, isNext]);

  /**
   * 이메일 인증을 확인하는 함수
   */
  async function checkEmailAuthentication() {
    if (mailButtonColor === colors.gray2) return;
    let getVerificationCodeAsync;
    if (isFindPassword) getVerificationCodeAsync = checkExistingEmailAsync;
    else getVerificationCodeAsync = checkNewEmailAsync;
    const serverResult = await getVerificationCodeAsync(email);
    if (serverResult.isSuccess) {
      setMailButtonColor(colors.gray2);
      setIsNext(true);
      setRealAuthNumber(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }

  /**
   * 인증번호를 확인하는 함수
   */
  useEffect(() => {
    const tmpArray = [...authNumberConditionArray];
    tmpArray[0] = authNumber.length > 0;
    tmpArray[1] = authNumber === realAuthNumber;
    if (!tmpArray[0]) setAuthNumberErr(errTextArray[4]);
    else if (!tmpArray[1]) setAuthNumberErr(errTextArray[5]);
    else setAuthNumberErr('');
    setAuthNumberConditionArray(tmpArray);
  }, [authNumber]);

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
          isFocus && !(emailConditionArray[0] && emailConditionArray[1])
            ? { borderWidth: 1, borderColor: colors.warning_red }
            : null
        }
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder={i18n.t('메일')}
          keyboardType="email-address"
          onChangeText={(textInput: string) => setEmail(textInput)}
          value={email}
          onFocus={() => setIsFocus(true)}
        />
        <LineButton
          content={i18n.t('메일 인증')}
          onPress={() => checkEmailAuthentication()}
          borderColor={mailButtonColor}
        />
      </area.FormArea>
      {isFocus && emailConditionArray.includes(false) ? (
        <WarningText content={emailErr} marginTop={8} />
      ) : null}

      {isNext ? (
        <View style={{ marginTop: 16 }}>
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('메일 인증 번호')}
            onChangeText={(textInput: string) => setAuthNumber(textInput)}
            keyboardType="numeric"
            isWarning={authNumberConditionArray.includes(false)}
            textValue={authNumber}
            warnText={authNumberErr}
          />
        </View>
      ) : null}

      <area.BottomArea>
        <View style={{ marginVertical: 16 }}>
          <ConditionButton
            isActive={isOK}
            onPress={() => (isOK ? onPress() : {})}
            content={i18n.t('메일로 계속하기')}
            paddingH={0}
            paddingV={14}
            height={45}
          />
        </View>

        <area.RowArea style={{ marginBottom: 16, justifyContent: 'center' }}>
          <text.Body2R textColor={colors.black}>
            {i18n.t('계정이 이미 있다면')}{' '}
          </text.Body2R>
          <PrimaryTextButton
            onPress={() => goLogin()}
            content={i18n.t('로그인')}
            isBold
          />
        </area.RowArea>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
