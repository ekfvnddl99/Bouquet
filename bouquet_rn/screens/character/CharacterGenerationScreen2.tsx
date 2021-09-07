import React, { useState, useEffect } from 'react';
import { View, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import i18n from 'i18n-js';

// styles
import * as area from '../../styles/styled-components/area';

// logics
import type { Character } from '../../utils/types/UserTypes';
import { getByte } from '../../logics/non-server/Calculation';
import { checkCharacterAsync } from '../../logics/server/Auth';

// components
import ConditionText from '../../components/text/ConditionText';
import ConditionButton from '../../components/button/ConditionButton';
import ConditionTextInput from '../../components/input/ConditionTextInput';

type CharacterGenerationScreen2Props = {
  isModifying: boolean;
  onPress: () => void;
  newCharacter: Character;
  setNewCharacter: (param: Character) => void;
};
export default function CharacterGenerationScreen2({
  isModifying,
  onPress,
  newCharacter,
  setNewCharacter,
}: CharacterGenerationScreen2Props): React.ReactElement {
  const [IsOK, setIsOK] = useState(false);
  const [conArray, setConArray] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const errText = ['필수 입력 항목이에요.', '이름 규칙을 지켜야 해요.'];

  const [dupResult, setDupResult] = useState(false);
  useEffect(() => {
    async function IsDupName() {
      const result = await checkCharacterAsync(newCharacter.name);
      setDupResult(!result);
    }

    const tmpArray = [...conArray];
    if (newCharacter.name.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    if (getByte(newCharacter.name) <= 18 && getByte(newCharacter.name) > 0)
      tmpArray[1] = true;
    else tmpArray[1] = false;
    // 중복 확인
    IsDupName();
    if (newCharacter.name.length > 0 && dupResult) tmpArray[2] = true;
    else tmpArray[2] = false;
    if (newCharacter.birth.toString.length > 0) tmpArray[3] = true;
    else tmpArray[3] = false;
    if (newCharacter.job.length > 0) tmpArray[4] = true;
    else tmpArray[4] = false;
    if (newCharacter.nationality.length > 0) tmpArray[5] = true;
    else tmpArray[5] = false;
    setConArray(tmpArray);
  }, [newCharacter]);
  useEffect(() => {
    if (conArray.includes(false)) setIsOK(false);
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
            isWarning={!(conArray[0] && conArray[1] && conArray[2])}
            textValue={newCharacter.name}
            warnText={!conArray[0] ? errText[0] : errText[1]}
            conditionTag={
              <View>
                <ConditionText
                  content={i18n.t('18 byte 이하')}
                  isActive={conArray[1]}
                />
                <ConditionText
                  content={i18n.t('중복되지 않는 이름')}
                  isActive={conArray[2]}
                />
              </View>
            }
            byteNum={18}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('생년월일 (YYYYMMDD)')}
            onChangeText={(textInput: string) => {
              setNewCharacter({
                ...newCharacter,
                birth: Number(textInput),
              });
            }}
            keyboardType="numeric"
            isWarning={!conArray[3]}
            textValue={newCharacter.birth.toString()}
            warnText={errText[0]}
            maxLength={8}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('직업')}
            onChangeText={(textInput: string) => {
              setNewCharacter({ ...newCharacter, job: textInput });
            }}
            keyboardType="default"
            isWarning={!conArray[4]}
            textValue={newCharacter.job}
            warnText={errText[0]}
          />
          <ConditionTextInput
            height={44}
            placeholder={i18n.t('국적')}
            onChangeText={(textInput: string) => {
              setNewCharacter({
                ...newCharacter,
                nationality: textInput,
              });
            }}
            keyboardType="default"
            isWarning={!conArray[5]}
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
