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
  // 이름 조건을 체크하는 배열과 state
  const [nameConditionArray, setNameConditionArray] = useState([
    false,
    false,
    isModifying,
  ]);
  // 생일 조건 체크하는 state
  const [birthCondition, setBirthCondition] = useState(false);
  // 직업 조건 체크하는 state
  const [jobCondition, setJobCondition] = useState(false);
  // 국적 조건 체크하는 state
  const [nationalityCondition, setNationalityCondition] = useState(false);
  // 이름 에러 메세지
  const [nameErr, setNameErr] = useState('');
  // 에러 메세지
  const errTextArray = ['필수 입력 항목이에요.', '이름 규칙을 지켜야 해요.'];
  // 수정 시, 기존 이름과 같은 경우 중복 안 되는 경우이므로 기존 이름을 기억하기 위한 변수
  const [originalName, setOriginalName] = useState(newCharacter.name);
  useEffect(() => {
    setOriginalName(newCharacter.name);
  }, []);

  /**
   * 이름 조건 체크 함수
   */
  useEffect(() => {
    async function checkCharacterName(arr: boolean[]) {
      const serverResult = await checkCharacterAsync(newCharacter.name);
      if (serverResult.isSuccess) {
        const value =
          originalName === newCharacter.name && serverResult.result
            ? true
            : !serverResult.result && newCharacter.name.length > 0;
        setNameConditionArray([arr[0], arr[1], value]);
      }
    }
    const tmpArray = [...nameConditionArray];
    // 이름 입력됐냐
    tmpArray[0] = newCharacter.name.length > 0;
    tmpArray[1] =
      getByte(newCharacter.name) <= 18 && getByte(newCharacter.name) > 0;
    checkCharacterName(tmpArray);
    if (!tmpArray[0]) setNameErr(errTextArray[0]);
    else if (!(tmpArray[1] && tmpArray[2])) setNameErr(errTextArray[1]);
    setNameConditionArray(tmpArray);
  }, [newCharacter.name]);

  /**
   * 생일 조건 체크 함수
   */
  useEffect(() => {
    setBirthCondition(newCharacter.birth.toString.length > 0);
  }, [newCharacter.birth]);

  /**
   * 직업 조건 체크 함수
   */
  useEffect(() => {
    setJobCondition(newCharacter.job.length > 0);
  }, [newCharacter.job]);
  /**
   * 국가 조건 체크 함수
   */
  useEffect(() => {
    setNationalityCondition(newCharacter.nationality.length > 0);
  }, [newCharacter.nationality]);

  // 매번 모든 조건을 만족하는지 확인
  useEffect(() => {
    if (
      nameConditionArray.includes(false) ||
      !birthCondition ||
      !jobCondition ||
      !nationalityCondition
    )
      setIsOK(false);
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
              setNewCharacter({ ...newCharacter, name: textInput });
            }}
            keyboardType="default"
            isWarning={nameConditionArray.includes(false)}
            textValue={newCharacter.name}
            warnText={nameErr}
            conditionTag={
              <View>
                <ConditionText
                  content={i18n.t('18 byte 이하')}
                  isActive={nameConditionArray[1]}
                />
                <ConditionText
                  content={i18n.t('중복되지 않는 이름')}
                  isActive={nameConditionArray[2]}
                />
              </View>
            }
            byteNum={18}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('생년월일 (YYYYMMDD)')}
            onChangeText={(textInput: string) => {
              setNewCharacter({ ...newCharacter, birth: Number(textInput) });
            }}
            keyboardType="numeric"
            isWarning={!birthCondition}
            textValue={
              newCharacter.birth === 0
                ? undefined
                : newCharacter.birth.toString()
            }
            warnText={errTextArray[0]}
            maxLength={8}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('직업')}
            onChangeText={(textInput: string) => {
              setNewCharacter({ ...newCharacter, job: textInput });
            }}
            keyboardType="default"
            isWarning={!jobCondition}
            textValue={newCharacter.job}
            warnText={errTextArray[0]}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('국적')}
            onChangeText={(textInput: string) => {
              setNewCharacter({ ...newCharacter, nationality: textInput });
            }}
            keyboardType="default"
            isWarning={!nationalityCondition}
            textValue={newCharacter.nationality}
            warnText={errTextArray[0]}
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
