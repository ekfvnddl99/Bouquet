import React, { useState, useEffect } from 'react';
import { View, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import i18n from 'i18n-js';

// styles
import * as area from '../../styles/styled-components/area';

// logics
import type { MyCharacter } from '../../utils/types/UserTypes';
import { getByte } from '../../logics/non-server/Calculation';
import { checkCharacterAsync } from '../../logics/server/Auth';

// components
import ConditionText from '../../components/text/ConditionText';
import ConditionButton from '../../components/button/ConditionButton';
import ConditionTextInput from '../../components/input/ConditionTextInput';

type CharacterGenerationScreen2Props = {
  isModifying: boolean;
  onPress: () => void;
  newCharacter: MyCharacter;
  setNewCharacter: (param: MyCharacter) => void;
};
/**
 * 캐릭터 이미지 설정하는 화면
 * @param isModifying 수정하는 거니?
 * @param onPress 다음으로 넘어가는 버튼 누를 때 실행되는 함수
 * @param newCharacter 생성/수정할 캐릭터 객체
 * @param setNewCharacter 생성/수정할 캐릭터 객체 set 함수
 * @returns
 */
export default function CharacterGenerationScreen2({
  isModifying,
  onPress,
  newCharacter,
  setNewCharacter,
}: CharacterGenerationScreen2Props): React.ReactElement {
  // 다음 단계 넘어가도 되는지 확인하는 state
  const [IsOK, setIsOK] = useState(false);
  // 조건을 체크하는 배열
  const [conditionArray, setConditionArray] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // 에러 메세지
  const errText = ['필수 입력 항목이에요.', '이름 규칙을 지켜야 해요.'];

  /**
   * 이름 조건 체크 함수
   * @param textInput 이름 입력받은 값
   */
  async function checkName(textInput: string) {
    // 입력받은 거 일단 저장
    setNewCharacter({ ...newCharacter, name: textInput });

    const tmpArray = [...conditionArray];
    // 입려됐냐
    if (newCharacter.name.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    // 바이트 수 지켰냐
    if (getByte(newCharacter.name) <= 18 && getByte(newCharacter.name) > 0)
      tmpArray[1] = true;
    else tmpArray[1] = false;
    // 중복된 이름이냐
    const serverResult = await checkCharacterAsync(newCharacter.name);
    if (newCharacter.name.length > 0 && serverResult.isSuccess)
      tmpArray[2] = true;
    else tmpArray[2] = false;
    setConditionArray(tmpArray);
  }

  /**
   * 생일 조건 체크 함수
   * @param textInput 생일 입력받은 값
   */
  function checkBirth(textInput: string) {
    setNewCharacter({ ...newCharacter, birth: Number(textInput) });
    const tmpArray = [...conditionArray];
    // 생일 입력했냐
    if (newCharacter.birth.toString.length > 0) tmpArray[3] = true;
    else tmpArray[3] = false;
    setConditionArray(tmpArray);
  }

  /**
   * 직업 조건 체크 함수
   * @param textInput 직업 입력받은 값
   */
  function checkJob(textInput: string) {
    setNewCharacter({ ...newCharacter, job: textInput });
    const tmpArray = [...conditionArray];
    // 직업 입력했냐
    if (newCharacter.job.length > 0) tmpArray[4] = true;
    else tmpArray[4] = false;
    setConditionArray(tmpArray);
  }
  /**
   * 국가 조건 체크 함수
   * @param textInput 국가 입력받은 값
   */
  function checkNationality(textInput: string) {
    setNewCharacter({ ...newCharacter, nationality: textInput });
    const tmpArray = [...conditionArray];
    // 국가 입력했냐
    if (newCharacter.nationality.length > 0) tmpArray[5] = true;
    else tmpArray[5] = false;
    setConditionArray(tmpArray);
  }

  // 매번 모든 조건을 만족하는지 확인
  useEffect(() => {
    if (conditionArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <area.ContainerBlank20>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('캐릭터 이름')}
            onChangeText={(textInput: string) => {
              checkName(textInput);
            }}
            keyboardType="default"
            isWarning={
              !(conditionArray[0] && conditionArray[1] && conditionArray[2])
            }
            textValue={newCharacter.name}
            warnText={!conditionArray[0] ? errText[0] : errText[1]}
            conditionTag={
              <View>
                <ConditionText
                  content={i18n.t('18 byte 이하')}
                  isActive={conditionArray[1]}
                />
                <ConditionText
                  content={i18n.t('중복되지 않는 이름')}
                  isActive={conditionArray[2]}
                />
              </View>
            }
            byteNum={18}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('생년월일 (YYYYMMDD)')}
            onChangeText={(textInput: string) => {
              checkBirth(textInput);
            }}
            keyboardType="numeric"
            isWarning={!conditionArray[3]}
            textValue={newCharacter.birth.toString()}
            warnText={errText[0]}
            maxLength={8}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('직업')}
            onChangeText={(textInput: string) => {
              checkJob(textInput);
            }}
            keyboardType="default"
            isWarning={!conditionArray[4]}
            textValue={newCharacter.job}
            warnText={errText[0]}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('국적')}
            onChangeText={(textInput: string) => {
              checkNationality(textInput);
            }}
            keyboardType="default"
            isWarning={!conditionArray[5]}
            textValue={newCharacter.nationality}
            warnText={errText[0]}
          />
          <View style={{ flexGrow: 1 }} />
          <View style={{ marginBottom: 16 }}>
            <ConditionButton
              height={44}
              isActive={IsOK}
              onPress={IsOK ? onPress : Keyboard.dismiss}
              content={
                isModifying
                  ? i18n.t('세부 소개 수정 완료')
                  : i18n.t('세부 소개 입력')
              }
              paddingH={0}
              paddingV={14}
            />
          </View>
        </ScrollView>
      </area.ContainerBlank20>
    </KeyboardAvoidingView>
  );
}
