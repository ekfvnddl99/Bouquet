import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useSetRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// assets
import Icon from '../../assets/Icon';

// logics
import { getByte } from '../../logics/non-server/Calculation';
import { checkUserAsync } from '../../logics/server/Auth';
import { editUserAsync } from '../../logics/server/User';
import useUser from '../../logics/hooks/useUser';
import { uploadImageAsync } from '../../logics/server/UploadImage';

// components
import ConditionText from '../../components/text/ConditionText';
import ConditionButton from '../../components/button/ConditionButton';
import ConditionTextInput from '../../components/input/ConditionTextInput';
import HeaderItem from '../../components/item/HeaderItem';
import { userState } from '../../logics/atoms';

export default function SettingProfileScreen(): React.ReactElement {
  const user = useUser();
  const navigation = useNavigation();
  const [name, setName] = useState(user.name);
  const [profileImg, setProfileImg] = useState(user.profile_img);
  const setNewAccount = useSetRecoilState(userState);

  // 모든 조건이 만족됐는지 확인하기 위한 state
  const [IsOK, setIsOK] = useState(false);
  // 이미지 선택하려고 눌렀냐
  // 여러번 누르면 여러번 갤러리가 떠서 방지하기 위해
  const [isSelectImg, setIsSelectImg] = useState(false);
  // 이름 입력 조건을 체크하는 배열
  const [nameConditionArray, setNameConditionArray] = useState([
    false,
    false,
    false,
  ]);
  // 이름 에러 메세지
  const [nameErr, setNameErr] = useState('');
  // 조건을 만족하지 못했을 때 뜨는 에러메세지
  const errTextArray = [
    '별명을 입력해 주세요.',
    '별명 규칙을 지켜야 해요.',
    '중복된 별명이에요.',
  ];

  /**
   * 이름 조건을 확인하는 함수
   * @description 이름 값이 바뀔 때마다 실행된다.
   */
  useEffect(() => {
    async function checkUserName(arr: boolean[]) {
      let value = false;
      if (!tmpArray[0]) setNameErr(errTextArray[0]);
      else if (!tmpArray[1]) setNameErr(errTextArray[1]);

      const serverResult = await checkUserAsync(name);
      if (serverResult.isSuccess) {
        value =
          user.name === name ? true : !serverResult.result && name.length > 0;
        if (!value) setNameErr(errTextArray[2]);
        else setNameErr('');
      }
      setNameConditionArray([arr[0], arr[1], value]);
    }
    const tmpArray = [...nameConditionArray];
    tmpArray[0] = name.length > 0;
    tmpArray[1] = getByte(name) <= 20 && getByte(name) > 0;
    checkUserName(tmpArray);
  }, [name]);

  /**
   * 매번 모든 조건이 다 충족됐는지 확인
   */
  useEffect(() => {
    if (nameConditionArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  });

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);

  const [loading, setLoading] = useState(false);
  async function setImage() {
    if (loading) return;
    setLoading(true);

    setIsSelectImg(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const serverResult = await uploadImageAsync(result.uri);
      if (serverResult.isSuccess) setProfileImg(serverResult.result);
      else alert(serverResult.result.errorMsg);
    }
    setIsSelectImg(false);

    setLoading(false);
  }

  const changeNgoProfile = async () => {
    const result = await editUserAsync(name, profileImg);
    if (result.isSuccess) {
      setNewAccount({ ...user, name, profile_img: profileImg });
      navigation.reset({ index: 0, routes: [{ name: 'Profile' }] });
    } else alert(result.result.errorMsg);
  };

  const goDeletion = () => {
    navigation.navigate('SettingAccountDeletion1');
  };

  return (
    <area.Container>
      <HeaderItem
        isAccount
        isBackButton
        name={user.name}
        profileImg={user.profile_img}
        routePrefix="ProfileTab"
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
          <area.ContainerBlank20>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <text.Subtitle1
                textColor={colors.black}
                style={{ marginBottom: 32 }}
              >
                {i18n.t('계정 프로필 수정')}
              </text.Subtitle1>

              <View style={{ alignItems: 'center', marginBottom: 32 }}>
                <TouchableOpacity
                  onPress={() => (isSelectImg ? {} : setImage())}
                >
                  {profileImg ? (
                    <elses.CircleImg
                      diameter={180}
                      source={{ uri: profileImg }}
                    />
                  ) : (
                    <elses.Circle diameter={180} backgroundColor={colors.white}>
                      <Icon icon="gallery" size={24} />
                    </elses.Circle>
                  )}
                </TouchableOpacity>
              </View>

              <ConditionTextInput
                height={44}
                placeholder={i18n.t('별명')}
                onChangeText={(textInput: string) => setName(textInput)}
                keyboardType="default"
                isWarning={nameConditionArray.includes(false)}
                textValue={name}
                warnText={nameErr}
                conditionTag={
                  <View>
                    <ConditionText
                      content={i18n.t('20 byte 이하')}
                      isActive={nameConditionArray[1]}
                    />
                    <ConditionText
                      content={i18n.t('중복되지 않는 이름')}
                      isActive={nameConditionArray[2]}
                    />
                  </View>
                }
                byteNum={20}
              />

              <area.BottomArea style={{ marginBottom: 16 }}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => goDeletion()}
                >
                  <text.Button3
                    textColor={colors.warning_red}
                    style={{ marginBottom: 16 }}
                  >
                    {i18n.t('계정 삭제')}
                  </text.Button3>
                </TouchableOpacity>
                <ConditionButton
                  isActive={IsOK}
                  onPress={() => (IsOK ? changeNgoProfile() : undefined)}
                  content={i18n.t('계정 프로필 수정 완료')}
                  paddingH={0}
                  paddingV={14}
                  height={45}
                />
              </area.BottomArea>
            </ScrollView>
          </area.ContainerBlank20>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </area.Container>
  );
}
