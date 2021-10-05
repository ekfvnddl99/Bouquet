import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import * as area from '../../styles/styled-components/area';

// logics
import useLogin from '../../logics/hooks/useLogin';
import useUser from '../../logics/hooks/useUser';
import { editPasswordAsync } from '../../logics/server/EmailLogin';

// components
import ProgressItem from '../../components/item/ProgressItem';

// screens
import RegisterScreen1 from './register/RegisterScreen1';
import RegisterScreen2 from './register/RegisterScreen2';
import RegisterScreen4 from './register/RegisterScreen4';

export default function FindPasswordScreen(): React.ReactElement {
  const user = useUser();
  // 현재 몇 단계인지 나타내는 state. 1부터 시작
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const [login] = useLogin();
  // 회원가입에서 입력될 값들 저장하는 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authNumber, setAuthNumber] = useState('');

  async function setNewPassword() {
    const serverResult = await editPasswordAsync(email, password);
    if (serverResult.isSuccess) {
      await login();
      setStep(step + 1);
    } else alert(serverResult.result.errorMsg);
  }

  function backAction() {
    if (step !== 1) setStep(step - 1);
    else navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });

  /**
   * 단계에 따른 제목
   * @param stepNumber 현재 단계
   * @returns
   */
  function setTitle(stepNumber: number) {
    if (stepNumber === 1) return '메일로 인증하기';
    if (stepNumber === 2) return '비밀번호 재설정';
    return '비밀번호 재설정 완료';
  }
  /**
   * 단계에 따른 View.
   * @param stepNumber 현재 단계
   * @returns
   */
  function setFindPasswordScreen(stepNumber: number) {
    if (stepNumber === 1)
      return (
        <RegisterScreen1
          onPress={() => setStep(step + 1)}
          setEmail={setEmail}
          email={email}
          setAuthNumber={setAuthNumber}
          authNumber={authNumber}
          isFindPassword
        />
      );
    if (stepNumber === 2)
      return (
        <RegisterScreen2
          onPress={() => setNewPassword()}
          password={password}
          setPassword={setPassword}
        />
      );
    return (
      <RegisterScreen4
        name={user.name}
        profileImg={user.profile_img}
        navigation={navigation}
        setNewPasswordString="비밀번호가 재설정 되었습니다!"
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <ProgressItem
            stepBack={() => setStep(step - 1)}
            step={step}
            maxLength={99}
            lastStep={3}
            title={setTitle(step)}
            navigation={navigation}
          />
        </View>

        {setFindPasswordScreen(step)}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
