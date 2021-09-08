import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';

// logics
import type { MyCharacter } from '../../utils/types/UserTypes';

// components
import ConditionButton from '../../components/button/ConditionButton';
import ConditionTextInput from '../../components/input/ConditionTextInput';
import WarningText from '../../components/text/WarningText';
import TagModifyingItem from '../../components/item/TagModifyingItem';

type CharacterGenerationScreen3Props = {
  isModifying: boolean;
  onPress: () => void;
  newCharacter: MyCharacter;
  setNewCharacter: (param: MyCharacter) => void;
};
export default function CharacterGenerationScreen3({
  isModifying,
  onPress,
  newCharacter,
  setNewCharacter,
}: CharacterGenerationScreen3Props): React.ReactElement {
  const [IsOK, setIsOK] = useState(false);
  const [conditionArray, setConditionArray] = useState([
    false,
    false,
    false,
    false,
  ]);
  const errText = ['필수 입력 항목이에요.', '한 개 이상 입력해주세요.'];

  const [isFocusingLikeInput, setIsFocusingLikeInput] = useState(false);
  const [isFocusingDislikeInput, setIsFocusingDislikeInput] = useState(false);

  const [likeArray, setLikeArray] = useState<string[]>(newCharacter.likes);
  const [dislikeArray, setDisLikeArray] = useState<string[]>(
    newCharacter.hates,
  );
  const [likeInput, setLikeInput] = useState('');
  const [dislikeInput, setDisLikeInput] = useState('');

  function createLikeTag(isBlur: boolean) {
    const tmpLikes = likeInput.slice(0, likeInput.length).trim();
    if (
      (likeInput[likeInput.length - 1] === ' ' || isBlur) &&
      tmpLikes.length > 0
    ) {
      setLikeInput('');
      setLikeArray([...likeArray, tmpLikes]);
      setNewCharacter({
        ...newCharacter,
        likes: [...likeArray, tmpLikes],
      });
    }
    checkLikeArray();
  }
  function createDislikeTag(isBlur: boolean) {
    const tmpDisLikes = dislikeInput.slice(0, dislikeInput.length).trim();
    if (
      (dislikeInput[dislikeInput.length - 1] === ' ' || isBlur) &&
      tmpDisLikes.length > 0
    ) {
      setDisLikeInput('');
      setDisLikeArray([...dislikeArray, tmpDisLikes]);
      setNewCharacter({
        ...newCharacter,
        hates: [...dislikeArray, tmpDisLikes],
      });
    }
    checkDislikeArray();
  }

  useEffect(() => {
    createLikeTag(false);
    createDislikeTag(false);
  });

  function checkIntro(textInput: string) {
    setNewCharacter({ ...newCharacter, intro: textInput });
    const tmpArray = [...conditionArray];
    if (newCharacter.intro.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    setConditionArray(tmpArray);
  }
  function checkLikeArray() {
    const tmpArray = [...conditionArray];
    if (likeArray.length > 0) tmpArray[1] = true;
    else tmpArray[1] = false;
    setConditionArray(tmpArray);
    setNewCharacter({ ...newCharacter, likes: likeArray });
  }
  function checkDislikeArray() {
    const tmpArray = [...conditionArray];
    if (dislikeArray.length > 0) tmpArray[2] = true;
    else tmpArray[2] = false;
    setConditionArray(tmpArray);
    setNewCharacter({ ...newCharacter, hates: dislikeArray });
  }
  function checkTmi(textInput: string) {
    setNewCharacter({ ...newCharacter, tmi: textInput });
    const tmpArray = [...conditionArray];
    if (newCharacter.tmi.length > 0) tmpArray[3] = true;
    else tmpArray[3] = false;
    setConditionArray(tmpArray);
  }
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
            placeholder={i18n.t('한 줄 소개')}
            onChangeText={(textInput: string) => checkIntro(textInput)}
            keyboardType="default"
            isWarning={!conditionArray[0]}
            textValue={newCharacter.intro}
            warnText={errText[0]}
          />

          <area.NoHeightArea
            marBottom={0}
            paddingH={16}
            paddingV={8}
            style={
              isFocusingLikeInput && likeArray.length === 0
                ? { borderWidth: 1, borderColor: colors.warning_red }
                : null
            }
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {likeArray.map((data: string, index: number) => (
                <TagModifyingItem
                  content={data}
                  tagIndex={index}
                  isSearching={false}
                  tagArray={likeArray}
                  setTagArray={setLikeArray}
                />
              ))}
              <TextInput
                placeholder={!likeArray.length ? i18n.t('좋아하는 것') : ''}
                onChangeText={(textInput: string) => setLikeInput(textInput)}
                value={likeInput}
                onFocus={() => setIsFocusingLikeInput(true)}
                onBlur={() => createLikeTag(true)}
                style={{ flexWrap: 'wrap', flexGrow: 1 }}
                multiline
              />
            </View>
          </area.NoHeightArea>
          <View style={{ marginBottom: 16 }}>
            {isFocusingLikeInput && likeArray.length === 0 ? (
              <WarningText content={errText[1]} marginTop={8} />
            ) : null}
          </View>

          <area.NoHeightArea
            marBottom={0}
            paddingH={16}
            paddingV={8}
            style={
              isFocusingDislikeInput && dislikeArray.length === 0
                ? { borderWidth: 1, borderColor: colors.warning_red }
                : null
            }
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {dislikeArray.map((data: string, index: number) => (
                <TagModifyingItem
                  content={data}
                  tagIndex={index}
                  isSearching={false}
                  tagArray={dislikeArray}
                  setTagArray={setDisLikeArray}
                />
              ))}
              <TextInput
                placeholder={!dislikeArray.length ? i18n.t('싫어하는 것') : ''}
                onChangeText={(textInput: string) => setDisLikeInput(textInput)}
                value={dislikeInput}
                onFocus={() => setIsFocusingDislikeInput(true)}
                onBlur={() => createDislikeTag(true)}
                style={{ flexWrap: 'wrap', flexGrow: 1 }}
                multiline
              />
            </View>
          </area.NoHeightArea>
          <View style={{ marginBottom: 16 }}>
            {isFocusingDislikeInput && dislikeArray.length === 0 ? (
              <WarningText content={errText[1]} marginTop={8} />
            ) : null}
          </View>

          <input.FormInput
            height={148}
            placeholder={
              i18n.t('이외에도 캐릭터에 대해서 자유롭게 알려 주세요 (선택)') +
              i18n.t('예시: 난 고민따위 하지 않는다')
            }
            onChangeText={(textInput: string) => checkTmi(textInput)}
            multiline
            style={{ textAlignVertical: 'top', paddingTop: 16 }}
            value={newCharacter.tmi}
          />
          <View style={{ flex: 1 }} />
          <View style={{ marginVertical: 16 }}>
            <ConditionButton
              height={44}
              isActive={IsOK}
              onPress={IsOK ? onPress : Keyboard.dismiss}
              content={
                isModifying
                  ? i18n.t('캐릭터 정보 수정 완료')
                  : i18n.t('캐릭터 생성 완료')
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
