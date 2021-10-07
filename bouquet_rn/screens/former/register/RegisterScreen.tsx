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
import * as area from '../../../styles/styled-components/area';

// logics
import { registerEmailAsync } from '../../../logics/server/EmailLogin';
import useLogin from '../../../logics/hooks/useLogin';
import uploadImageAsync from '../../../logics/server/UploadImage';
import { editUserAsync } from '../../../logics/server/User';

// components
import ProgressItem from '../../../components/item/ProgressItem';

// screens
import RegisterScreen1 from './RegisterScreen1';
import RegisterScreen2 from './RegisterScreen2';
import RegisterScreen3 from './RegisterScreen3';
import RegisterScreen4 from './RegisterScreen4';
import {
  getPushNotificationsPermission,
  registerNotificationTokenAsync,
} from '../../../logics/server/Notification';

export default function RegisterScreen(): React.ReactElement {
  // 현재 몇 단계인지 나타내는 state. 1부터 시작
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const [login] = useLogin();
  // 회원가입에서 입력될 값들 저장하는 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [realAuthNumber, setRealAuthNumber] = useState('');
  const [profileImg, setProfileImg] = useState('');

  async function registerUser() {
    let realProfileImg = profileImg;
    const imgServerResult = await uploadImageAsync(profileImg);
    if (imgServerResult.isSuccess) realProfileImg = imgServerResult.result;
    else {
      alert('이미지 업로드에 실패했어요. 대신 기본 이미지를 사용할게요.');
      realProfileImg =
        'https://bouquet-storage.s3.ap-northeast-2.amazonaws.com/5b6ee222-2415-11ec-ab3a-0242ac110002.png';
    }

    const serverResult = await registerEmailAsync(
      email,
      password,
      name,
      realProfileImg,
    );
    if (serverResult.isSuccess) {
      await SecureStore.setItemAsync('auth', serverResult.result);
      await login();

      await getPushNotificationsPermission();
      const getToken = await SecureStore.getItemAsync('pushToken');
      if (typeof getToken === 'string') {
        const postToken = await registerNotificationTokenAsync(getToken);
        if (postToken.isSuccess) {
          setStep(step + 1);
        } else alert(postToken.result.errorMsg);
      } else alert('다시 시도해주세요.');
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
    if (stepNumber === 1) return i18n.t('메일로 회원가입');
    if (stepNumber === 2) return i18n.t('비밀번호 설정');
    if (stepNumber === 3) return i18n.t('계정 정보 입력');
    return i18n.t('회원가입 완료');
  }
  /**
   * 단계에 따른 View.
   * @param stepNumber 현재 단계
   * @returns
   */
  function setRegisterScreen(stepNumber: number) {
    if (stepNumber === 1)
      return (
        <RegisterScreen1
          onPress={() => setStep(step + 1)}
          setEmail={setEmail}
          email={email}
          setAuthNumber={setAuthNumber}
          authNumber={authNumber}
          realAuthNumber={realAuthNumber}
          setRealAuthNumber={setRealAuthNumber}
        />
      );
    if (stepNumber === 2)
      return (
        <RegisterScreen2
          onPress={() => setStep(step + 1)}
          password={password}
          setPassword={setPassword}
        />
      );
    if (stepNumber === 3)
      return (
        <RegisterScreen3
          onPress={() => registerUser()}
          name={name}
          setName={setName}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
        />
      );
    return (
      <RegisterScreen4
        name={name}
        profileImg={profileImg}
        navigation={navigation}
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
            maxLength={100}
            lastStep={4}
            title={setTitle(step)}
            navigation={navigation}
          />
        </View>

        {setRegisterScreen(step)}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
