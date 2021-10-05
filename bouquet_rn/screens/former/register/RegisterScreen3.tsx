import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// icons
import Svg from '../../../assets/Icon';

// logics
import { getByte } from '../../../logics/non-server/Calculation';
import { checkUserAsync } from '../../../logics/server/Auth';
import uploadImageAsync from '../../../logics/server/UploadImage';
import { getImagePickerPermission } from '../../../logics/server/Post';

// components
import ConditionText from '../../../components/text/ConditionText';
import ConditionButton from '../../../components/button/ConditionButton';
import PrimaryTextButton from '../../../components/button/PrimaryTextButton';
import ConditionTextInput from '../../../components/input/ConditionTextInput';

type RegisterPropsThree = {
  onPress: () => void;
  name: string;
  setName: (param: string) => void;
  profileImg: string;
  setProfileImg: (parma: string) => void;
};
/**
 * 회원가입 세 번째 화면.
 * @description 이름 입력 + 프로필 사진 입력
 *
 * @param onPress 그 다음으로 가기 위한 버튼 눌렀을 때 시행되는 함수.
 * @description 이때 서버에서 register 처리함!!!
 * @param name 이름 변수
 * @param setName 이름 set 함수
 * @param profileImg 이미지 변수
 * @param setProfileImg 이미지 set 함수
 * @returns
 */
export default function RegisterScreen3({
  onPress,
  name,
  setName,
  profileImg,
  setProfileImg,
}: RegisterPropsThree): React.ReactElement {
  const navigation = useNavigation();
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
    '중복된 별명입니다.',
  ];

  /**
   * 이름 조건을 확인하는 함수
   * @description 이름 값이 바뀔 때마다 실행된다.
   */
  useEffect(() => {
    async function checkUserName(arr: boolean[]) {
      const serverResult = await checkUserAsync(name);
      if (serverResult.isSuccess) {
        const value = !serverResult.result && name.length > 0;
        if (!tmpArray[0]) setNameErr(errTextArray[0]);
        else if (!tmpArray[1]) setNameErr(errTextArray[1]);
        else if (!value) setNameErr(errTextArray[2]);
        else setNameErr('');
        setNameConditionArray([arr[0], arr[1], value]);
      }
    }
    const tmpArray = [...nameConditionArray];
    tmpArray[0] = name.length > 0;
    tmpArray[1] = getByte(name) <= 20 && getByte(name) > 0;
    checkUserName(tmpArray);
    setNameConditionArray(tmpArray);
  }, [name]);

  /**
   * 매번 모든 조건이 다 충족됐는지 확인
   */
  useEffect(() => {
    if (nameConditionArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  });

  /**
   * 사진 가져올 때 권한 설정아 안 되어 있으면 띄우는 함수
   */
  useEffect(() => {
    (async () => {
      await getImagePickerPermission();
    })();
  }, []);

  /**
   * 이미지 가져오는 함수
   */
  async function setImage() {
    setIsSelectImg(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(result.uri, [
        { resize: { width: 1024, height: 1024 } },
      ]);
      const realUri = manipResult.uri;
      setProfileImg(realUri);
    }
    setIsSelectImg(false);
  }

  function goWebview(screen: string) {
    navigation.navigate('DocumentScreen', { screen });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <area.ContainerBlank20>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity onPress={() => (isSelectImg ? {} : setImage())}>
              {profileImg ? (
                <elses.CircleImg diameter={180} source={{ uri: profileImg }} />
              ) : (
                <elses.Circle diameter={180} backgroundColor={colors.white}>
                  <Svg icon="gallery" size={24} />
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
          <View style={{ flexGrow: 1 }} />
          <View style={{ marginBottom: 16 }}>
            {i18n.locale === 'en' ? (
              <View style={{ alignItems: 'center' }}>
                <text.Caption textColor={colors.gray6}>
                  {i18n.t('에 모두 동의하시나요')}{' '}
                </text.Caption>
              </View>
            ) : null}
            <area.RowArea
              style={{ marginBottom: 16, justifyContent: 'center' }}
            >
              <TouchableOpacity
                onPress={() => goWebview('ServiceTerm')}
                activeOpacity={1}
              >
                <text.Caption textColor={colors.primary}>
                  서비스 이용 약관
                </text.Caption>
              </TouchableOpacity>
              <text.Caption textColor={colors.gray6}>, </text.Caption>
              <TouchableOpacity
                onPress={() => goWebview('PersonalInfo')}
                activeOpacity={1}
              >
                <text.Caption textColor={colors.primary}>
                  개인정보 취급 방침
                </text.Caption>
              </TouchableOpacity>
              {i18n.locale === 'ko' ? (
                <text.Caption textColor={colors.gray6}>
                  {i18n.t('에 모두 동의하시나요')}
                </text.Caption>
              ) : (
                <text.Caption textColor={colors.gray6}>?</text.Caption>
              )}
            </area.RowArea>

            <ConditionButton
              isActive={IsOK}
              onPress={() => (IsOK ? onPress() : {})}
              content={i18n.t('필수 약관 동의 & 가입 완료')}
              paddingH={0}
              paddingV={14}
              height={45}
            />
          </View>
        </ScrollView>
      </area.ContainerBlank20>
    </KeyboardAvoidingView>
  );
}
