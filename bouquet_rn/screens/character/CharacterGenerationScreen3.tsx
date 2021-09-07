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
import type { Character } from '../../utils/types/UserTypes';

// components
import ConditionButton from '../../components/button/ConditionButton';
import ConditionTextInput from '../../components/input/ConditionTextInput';
import WarningText from '../../components/text/WarningText';
import TagModifyingItem from '../../components/item/TagModifyingItem';

type CharacterGenerationScreen3Props = {
  isModifying: boolean;
  onPress: () => void;
  characterToCreate: Character;
  setCharacterToCreate: (param: Character) => void;
};
export default function CharacterGenerationScreen3({
  isModifying,
  onPress,
  characterToCreate,
  setCharacterToCreate,
}: CharacterGenerationScreen3Props): React.ReactElement {
  const [IsOK, setIsOK] = useState(false);
  const [conArray, setConArray] = useState([false, false, false]);
  const errText = ['필수 입력 항목이에요.', '한 개 이상 입력해주세요.'];

  const [likeFocus, setLikeFocus] = useState(false);
  const [dislikeFocus, setDislikeFocus] = useState(false);

  const [likeList, setLikeList]: any = useState(characterToCreate.likes);
  const [dislikeList, setDisLikeList]: any = useState(characterToCreate.hates);
  const [likeInput, setLikeInput] = useState('');
  const [dislikeInput, setDisLikeInput] = useState('');

  function likeTags(blur: number) {
    const tmpLikes = likeInput.slice(0, likeInput.length).trim();
    if (
      (likeInput[likeInput.length - 1] === ' ' || blur === 1) &&
      tmpLikes.length > 0
    ) {
      setLikeInput('');
      setLikeList([...likeList, tmpLikes]);
      setCharacterToCreate({
        ...characterToCreate,
        likes: [...likeList, tmpLikes],
      });
    }
  }
  function dislikeTags(blur: number) {
    const tmpDisLikes = dislikeInput.slice(0, dislikeInput.length).trim();
    if (
      (dislikeInput[dislikeInput.length - 1] === ' ' || blur === 1) &&
      tmpDisLikes.length > 0
    ) {
      setDisLikeInput('');
      setDisLikeList([...dislikeList, tmpDisLikes]);
      setCharacterToCreate({
        ...characterToCreate,
        hates: [...dislikeList, tmpDisLikes],
      });
    }
  }

  useEffect(() => {
    likeTags(0);
    dislikeTags(0);
  });
  useEffect(() => {
    const tmpArray = [...conArray];
    if (characterToCreate.intro.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    setConArray(tmpArray);
  }, [characterToCreate]);
  useEffect(() => {
    const tmpArray = [...conArray];
    if (likeList.length > 0) tmpArray[1] = true;
    else tmpArray[1] = false;
    setConArray(tmpArray);
    setCharacterToCreate({ ...characterToCreate, likes: likeList });
  }, [likeList]);
  useEffect(() => {
    const tmpArray = [...conArray];
    if (dislikeList.length > 0) tmpArray[2] = true;
    else tmpArray[2] = false;
    setConArray(tmpArray);
    setCharacterToCreate({ ...characterToCreate, hates: dislikeList });
  }, [dislikeList]);
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
            placeholder={i18n.t('한 줄 소개')}
            onChangeText={(text: string) => {
              setCharacterToCreate({ ...characterToCreate, intro: text });
            }}
            keyboardType="default"
            isWarning={!conArray[0]}
            textValue={characterToCreate.intro}
            warnText={errText[0]}
          />

          <area.NoHeightArea
            marBottom={0}
            paddingH={16}
            paddingV={8}
            style={
              likeFocus && likeList.length === 0
                ? { borderWidth: 1, borderColor: colors.warning_red }
                : null
            }
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {likeList.map((data: string, index: number) => (
                <TagModifyingItem
                  content={data}
                  tagIndex={index}
                  isSearching={false}
                  tagArray={dislikeList}
                  setTagArray={setDisLikeList}
                />
              ))}
              <TextInput
                placeholder={likeList.length === 0 ? i18n.t('좋아하는 것') : ''}
                onChangeText={(textInput: string) => setLikeInput(textInput)}
                value={likeInput}
                onFocus={() => setLikeFocus(true)}
                onBlur={() => likeTags(1)}
                style={{ flexWrap: 'wrap', flexGrow: 1 }}
                multiline
              />
            </View>
          </area.NoHeightArea>
          <View style={{ marginBottom: 16 }}>
            {likeFocus && likeList.length === 0 ? (
              <WarningText content={errText[1]} marginTop={8} />
            ) : null}
          </View>

          <area.NoHeightArea
            marBottom={0}
            paddingH={16}
            paddingV={8}
            style={
              dislikeFocus && dislikeList.length === 0
                ? { borderWidth: 1, borderColor: colors.warning_red }
                : null
            }
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {dislikeList.map((data: string, index: number) => (
                <TagModifyingItem
                  content={data}
                  tagIndex={index}
                  isSearching={false}
                  tagArray={dislikeList}
                  setTagArray={setDisLikeList}
                />
              ))}
              <TextInput
                placeholder={
                  dislikeList.length === 0 ? i18n.t('싫어하는 것') : ''
                }
                onChangeText={(textInput: string) => setDisLikeInput(textInput)}
                value={dislikeInput}
                onFocus={() => setDislikeFocus(true)}
                onBlur={() => dislikeTags(1)}
                style={{ flexWrap: 'wrap', flexGrow: 1 }}
                multiline
              />
            </View>
          </area.NoHeightArea>
          <View style={{ marginBottom: 16 }}>
            {dislikeFocus && dislikeList.length === 0 ? (
              <WarningText content={errText[1]} marginTop={8} />
            ) : null}
          </View>

          <input.FormInput
            height={148}
            placeholder={
              i18n.t('이외에도 캐릭터에 대해서 자유롭게 알려 주세요 (선택)') +
              i18n.t('예시: 난 고민따위 하지 않는다')
            }
            onChangeText={(textInput: string) => {
              setCharacterToCreate({ ...characterToCreate, tmi: textInput });
            }}
            multiline
            style={{ textAlignVertical: 'top', paddingTop: 16 }}
            value={characterToCreate.tmi}
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
