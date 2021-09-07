import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// icons
import Svg from '../../../assets/Icon';

// props & logic
import { getByte } from '../../../logics/non-server/Calculation';
import { checkUserAsync } from '../../../logics/server/Auth';

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
  // 모든 조건이 만족됐는지 확인하기 위한 state
  const [IsOK, setIsOK] = useState(false);
  // 이름 입력 조건을 체크하는 배열
  const [nameConditionArray, setNameConditionArray] = useState([
    false,
    false,
    false,
  ]);
  // 조건을 만족하지 못했을 때 뜨는 에러메세지
  const errText = ['별명을 입력해 주세요.', '별명 규칙을 지켜야 해요.'];

  /**
   * 이름 조건을 확인하는 함수
   * @description 이름 값이 바뀔 때마다 실행된다.
   * @param textInput 입력되는 이름 값
   */
  async function checkName(textInput: string) {
    setName(textInput);
    const tmpArray = [...nameConditionArray];
    if (name.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    if (getByte(name) <= 20 && getByte(name) > 0) tmpArray[1] = true;
    else tmpArray[1] = false;
    // 중복 조건
    const serverResult = await checkUserAsync(name);
    if (name.length > 0 && serverResult.isSuccess) tmpArray[2] = true;
    else tmpArray[2] = false;
    setNameConditionArray(tmpArray);
  }

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
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);

  /**
   * 이미지 가져오는 함수
   */
  async function setImg() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImg(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <area.ContainerBlank20>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity onPress={() => setImg}>
              {profileImg ? (
                <elses.CircleImg diameter={180} source={{ uri: profileImg }} />
              ) : (
                <elses.Circle diameter={180}>
                  <Svg icon="gallery" size={24} />
                </elses.Circle>
              )}
            </TouchableOpacity>
          </View>

          <ConditionTextInput
            height={44}
            placeholder={i18n.t('별명')}
            onChangeText={(textInput: string) => checkName(textInput)}
            keyboardType="default"
            isWarning={
              !(
                nameConditionArray[0] &&
                nameConditionArray[1] &&
                nameConditionArray[2]
              )
            }
            textValue={name}
            warnText={!nameConditionArray[0] ? errText[0] : errText[1]}
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
            <area.RowArea style={{ marginBottom: 16 }}>
              <PrimaryTextButton
                onPress={() => {}}
                content={i18n.t('서비스 이용 약관')}
                isBold={false}
              />
              <text.Caption textColor={colors.gray6}>, </text.Caption>
              <PrimaryTextButton
                onPress={() => {}}
                content={i18n.t('개인정보 취급 방침')}
                isBold={false}
              />
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
              onPress={IsOK ? onPress : undefined}
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
