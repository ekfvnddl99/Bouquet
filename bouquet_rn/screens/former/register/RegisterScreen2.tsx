import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';

// assets
import Svg from '../../../assets/Icon';

// components
import ConditionText from '../../../components/text/ConditionText';
import ConditionButton from '../../../components/button/ConditionButton';
import WarningText from '../../../components/text/WarningText';

type RegisterScreenProps = {
  onPress: () => void;
  password: string;
  setPassword: (parma: string) => void;
};
/**
 * 회원가입 두 번째 화면.
 * @description 비밀번호 입력
 *
 * @param onPress 그 다음으로 가기 위한 버튼 눌렀을 때 시행되는 함수
 * @param password 비밀번호 변수
 * @param setPassword 비밀번호 set 함수
 * @returns
 */
export default function RegisterScreen2({
  onPress,
  password,
  setPassword,
}: RegisterScreenProps): React.ReactElement {
  // 모든 조건이 만족됐는지 확인하기 위한 state
  const [IsOK, setIsOK] = useState(false);
  // 해당 textinput에 focus가 있는지 확인하기 위한 state
  const [IsFocus, setFocus] = useState(false);
  // 비밀번호 보이게 하는지 아닌지 확인하기 위한 state
  const [isShowing, setIsShowing] = useState(false);

  // 비밀번호 입력 조건을 체크하는 배열
  const [passwordConditionArray, setPasswordConditionArray] = useState([
    false,
    false,
  ]);
  // 조건을 만족하지 못했을 때 뜨는 에러메세지
  const errText = ['비밀번호를 입력해 주세요.', '비밀번호 규칙을 지켜야 해요.'];
  // 비밀번호 정규표현식
  const passwordRegex = /^(?=.*\d)|((?=.*[\w])|(?=.*[!@#$%^*+=-])).{8,32}$/;

  /**
   * 비밀번호 조건을 확인하는 함수
   * @description 비밀번호 값이 바뀔 때마다 실행된다.
   * @param textInput 입력되는 email 값
   */
  function checkPassword(textInput: string) {
    setPassword(textInput);
    const tmpArray = [...passwordConditionArray];
    if (password.length > 0) tmpArray[0] = true;
    else tmpArray[1] = false;
    if (
      password.length >= 8 &&
      password.length <= 32 &&
      passwordRegex.test(password)
    )
      tmpArray[1] = true;
    else tmpArray[1] = false;
    setPasswordConditionArray(tmpArray);
  }

  /**
   * 매번 모든 조건이 다 충족됐는지 확인
   */
  useEffect(() => {
    if (passwordConditionArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  });

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
    <area.ContainerBlank20>
      <area.FormArea
        height="44"
        style={
          IsFocus && !(passwordConditionArray[0] && passwordConditionArray[1])
            ? { borderWidth: 1, borderColor: colors.warning_red }
            : null
        }
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder={i18n.t('비밀번호')}
          secureTextEntry={isShowing}
          onChangeText={(textInput: string) => checkPassword(textInput)}
          onFocus={() => setFocus(true)}
          value={password}
        />
        <TouchableOpacity
          onPress={() => {
            setIsShowing(!isShowing);
          }}
        >
          {setEyeIcon(isShowing)}
        </TouchableOpacity>
      </area.FormArea>
      {IsFocus && !(passwordConditionArray[0] && passwordConditionArray[1]) ? (
        <WarningText
          content={!passwordConditionArray[0] ? errText[0] : errText[1]}
          marginTop={8}
        />
      ) : null}

      <ConditionText
        content={i18n.t('8글자 이상, 32글자 이하')}
        isActive={passwordConditionArray[1]}
      />

      <area.BottomArea style={{ marginBottom: 16 }}>
        <ConditionButton
          isActive={IsOK}
          onPress={
            IsOK
              ? onPress
              : () => {
                  /**/
                }
          }
          content={i18n.t('계정 정보 입력')}
          paddingH={0}
          paddingV={14}
          height={45}
        />
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
