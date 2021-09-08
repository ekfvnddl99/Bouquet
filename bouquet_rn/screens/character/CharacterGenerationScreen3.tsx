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
  // 다음 단계 넘어가도 되는지 확인하는 state
  const [IsOK, setIsOK] = useState(false);
  // 조건을 체크하는 배열
  const [conditionArray, setConditionArray] = useState([
    false,
    false,
    false,
    false,
  ]);
  // 에러 메세지
  const errText = ['필수 입력 항목이에요.', '한 개 이상 입력해주세요.'];

  // '좋아하는 것' 입력창 누른 상태냐
  const [isFocusingLikeInput, setIsFocusingLikeInput] = useState(false);
  // '싫어하는 것' 입력창 누른 상태냐
  const [isFocusingDislikeInput, setIsFocusingDislikeInput] = useState(false);

  // '좋아하는 것' 배열
  const [likeArray, setLikeArray] = useState<string[]>(newCharacter.likes);
  // '싫어하는 것' 배열
  const [dislikeArray, setDisLikeArray] = useState<string[]>(
    newCharacter.hates,
  );
  // '좋아하는 것' 입력값
  const [likeInput, setLikeInput] = useState('');
  // '싫어하는 것' 입력값
  const [dislikeInput, setDisLikeInput] = useState('');

  /**
   * '좋아하는 것' 태그 만들어주는 함수
   * @param isBlur '좋아하는 것' 입력창이 안 눌러진 상태냐
   */
  function createLikeTag(isBlur: boolean) {
    const tmpLikes = likeInput.slice(0, likeInput.length).trim();
    // 일단 입력값이 있고, 마지막이 공백이거나 입력창에 손 땐 경우에 만든다!
    if (
      (likeInput[likeInput.length - 1] === ' ' || isBlur) &&
      tmpLikes.length > 0
    ) {
      // 태그 만들었으니 초기화
      setLikeInput('');
      // 배열에 추가
      setLikeArray([...likeArray, tmpLikes]);
      // 해당 배열을 캐릭터 객체에 저장
      setNewCharacter({
        ...newCharacter,
        likes: [...likeArray, tmpLikes],
      });
    }
    checkLikeArray();
  }
  /**
   * '싫어하는 것' 태그 만들어주는 함수
   * @param isBlur '싫어하는 것' 입력창이 안 눌러진 상태냐
   */
  function createDislikeTag(isBlur: boolean) {
    const tmpDisLikes = dislikeInput.slice(0, dislikeInput.length).trim();
    // 일단 입력값이 있고, 마지막이 공백이거나 입력창에 손 땐 경우에 만든다!
    if (
      (dislikeInput[dislikeInput.length - 1] === ' ' || isBlur) &&
      tmpDisLikes.length > 0
    ) {
      // 태그 만들었으니 초기화
      setDisLikeInput('');
      // 배열에 추가
      setDisLikeArray([...dislikeArray, tmpDisLikes]);
      // 해당 배열을 캐릭터 객체에 저장
      setNewCharacter({
        ...newCharacter,
        hates: [...dislikeArray, tmpDisLikes],
      });
    }
    checkDislikeArray();
  }

  // isBlur가 true가 되면 계속 태그가 만들어지므로 진짜 blur 상황 빼고는 늘 false를 유지하도록 한다.
  useEffect(() => {
    createLikeTag(false);
    createDislikeTag(false);
  });

  /**
   * '한 줄 소개' 조건 체크 함수
   * @param textInput '한 줄 소개' 입력받은 값
   */
  function checkIntro(textInput: string) {
    setNewCharacter({ ...newCharacter, intro: textInput });
    const tmpArray = [...conditionArray];
    // '한 줄 소개' 입력했냐
    if (newCharacter.intro.length > 0) tmpArray[0] = true;
    else tmpArray[0] = false;
    setConditionArray(tmpArray);
  }
  /**
   * '좋아하는 것' 조건 체크 함수
   */
  function checkLikeArray() {
    const tmpArray = [...conditionArray];
    // 1개 이상 좋아하냐
    if (likeArray.length > 0) tmpArray[1] = true;
    else tmpArray[1] = false;
    setConditionArray(tmpArray);
    setNewCharacter({ ...newCharacter, likes: likeArray });
  }
  /**
   * '싫어하는 것' 조건 체크 함수
   */
  function checkDislikeArray() {
    const tmpArray = [...conditionArray];
    // 1개 이상 싫어하냐
    if (dislikeArray.length > 0) tmpArray[2] = true;
    else tmpArray[2] = false;
    setConditionArray(tmpArray);
    setNewCharacter({ ...newCharacter, hates: dislikeArray });
  }
  /**
   * 특이사항 조건 체크 함수
   * @param textInput 특이사항 입력받은 값
   */
  function checkTmi(textInput: string) {
    setNewCharacter({ ...newCharacter, tmi: textInput });
    const tmpArray = [...conditionArray];
    // 특이사항 입력했냐
    if (newCharacter.tmi.length > 0) tmpArray[3] = true;
    else tmpArray[3] = false;
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
