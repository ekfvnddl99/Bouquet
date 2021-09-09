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
  // 좋아하는 것 조건 체크하는 state
  const [likeCondition, setLikeCondition] = useState(false);
  // 싫어하는 것 조건 체크하는 state
  const [dislikeCondition, setDislikeCondition] = useState(false);
  // 한 줄 소개 조건 체크하는 state
  const [introCondition, setIntroCondition] = useState(false);
  // 특이사항 조건 체크하는 state
  const [tmiCondition, setTmiCondition] = useState(false);
  // 에러 메세지
  const errTextArray = ['필수 입력 항목이에요.', '한 개 이상 입력해주세요.'];

  // '좋아하는 것' 입력창 누른 상태냐
  const [isFocusingLikeInput, setIsFocusingLikeInput] = useState(false);
  // '싫어하는 것' 입력창 누른 상태냐
  const [isFocusingDislikeInput, setIsFocusingDislikeInput] = useState(false);
  // 'tmi' 입력창 누른 상태냐
  const [isFocusTmiInput, setIsFocusTmiInput] = useState(false);

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
   * * dependency가 likeArray인 useEffect에 영향을 준다.
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
    }
  }
  /**
   * '싫어하는 것' 태그 만들어주는 함수
   * * dependency가 dislikeArray인 useEffect에 영향을 준다.
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
    }
  }

  // isBlur가 true가 되면 계속 태그가 만들어지므로 진짜 blur 상황 빼고는 늘 false를 유지하도록 한다.
  useEffect(() => {
    createLikeTag(false);
    createDislikeTag(false);
  });

  /**
   * '한 줄 소개' 조건 체크 함수
   */
  useEffect(() => {
    setIntroCondition(newCharacter.intro.length > 0);
  }, [newCharacter.intro]);
  /**
   * '좋아하는 것' 조건 체크 함수
   */
  useEffect(() => {
    setLikeCondition(likeArray.length > 0);
    setNewCharacter({
      ...newCharacter,
      likes: likeArray,
    });
  }, [likeArray]);
  /**
   * '싫어하는 것' 조건 체크 함수
   */
  useEffect(() => {
    setDislikeCondition(dislikeArray.length > 0);
    setNewCharacter({
      ...newCharacter,
      hates: dislikeArray,
    });
  }, [dislikeArray]);
  /**
   * 특이사항 조건 체크 함수
   */
  useEffect(() => {
    setTmiCondition(newCharacter.tmi.length > 0);
  }, [newCharacter.tmi]);

  // 매번 모든 조건을 만족하는지 확인
  useEffect(() => {
    if (!(introCondition && tmiCondition && likeCondition && dislikeCondition))
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
            placeholder={i18n.t('한 줄 소개')}
            onChangeText={(textInput: string) =>
              setNewCharacter({ ...newCharacter, intro: textInput })
            }
            keyboardType="default"
            isWarning={!introCondition}
            textValue={newCharacter.intro}
            warnText={errTextArray[0]}
          />

          <area.NoHeightArea
            marBottom={0}
            paddingH={16}
            paddingV={8}
            style={
              isFocusingLikeInput && !likeCondition
                ? { borderWidth: 1, borderColor: colors.warning_red }
                : null
            }
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {likeArray.map((data: string, index: number) => (
                <View>
                  <TagModifyingItem
                    content={data}
                    tagIndex={index}
                    isSearching={false}
                    tagArray={likeArray}
                    setTagArray={setLikeArray}
                  />
                </View>
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
            {isFocusingLikeInput && !likeCondition ? (
              <WarningText content={errTextArray[1]} marginTop={8} />
            ) : null}
          </View>

          <area.NoHeightArea
            marBottom={0}
            paddingH={16}
            paddingV={8}
            style={
              isFocusingDislikeInput && !dislikeCondition
                ? { borderWidth: 1, borderColor: colors.warning_red }
                : null
            }
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {dislikeArray.map((data: string, index: number) => (
                <View>
                  <TagModifyingItem
                    content={data}
                    tagIndex={index}
                    isSearching={false}
                    tagArray={dislikeArray}
                    setTagArray={setDisLikeArray}
                  />
                </View>
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
            {isFocusingDislikeInput && !dislikeCondition ? (
              <WarningText content={errTextArray[1]} marginTop={8} />
            ) : null}
          </View>

          <input.FormInput
            height={148}
            placeholder={
              i18n.t('이외에도 캐릭터에 대해서 자유롭게 알려 주세요 (선택)') +
              i18n.t('예시: 난 고민따위 하지 않는다')
            }
            onChangeText={(textInput: string) =>
              setNewCharacter({ ...newCharacter, tmi: textInput })
            }
            keyboardType="default"
            onFocus={() => setIsFocusTmiInput(true)}
            multiline
            style={
              isFocusTmiInput && !tmiCondition
                ? {
                    borderWidth: 1,
                    borderColor: colors.warning_red,
                    textAlignVertical: 'top',
                    paddingTop: 16,
                  }
                : { textAlignVertical: 'top', paddingTop: 16 }
            }
            value={newCharacter.tmi}
          />
          <View style={{ flex: 1 }}>
            {isFocusTmiInput && !tmiCondition ? (
              <WarningText content={errTextArray[0]} marginTop={8} />
            ) : null}
          </View>

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
