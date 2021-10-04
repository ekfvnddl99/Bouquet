import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import * as area from '../../styles/styled-components/area';

// logics
import {
  createCharacterAsync,
  editCharacterAsync,
} from '../../logics/server/Character';
import useCharacter from '../../logics/hooks/useCharacter';
import UploadImageAsync from '../../logics/server/UploadImage';
import useLoadCharacter from '../../logics/hooks/useLoadCharacter';

// components
import ProgressItem from '../../components/item/ProgressItem';

// screens
import CharacterGenerationScreen1 from './CharacterGenerationScreen1';
import CharacterGenerationScreen2 from './CharacterGenerationScreen2';
import CharacterGenerationScreen3 from './CharacterGenerationScreen3';
import CharacterGenerationScreen4 from './CharacterGenerationScreen4';

// utils
import { MyCharacter, noMyCharacter } from '../../utils/types/UserTypes';
import { CharacterGenerationProps } from '../../utils/types/NavigationTypes';

type ParamList = {
  CharacterGeneration: {
    isModifying: boolean;
    characterInfo: MyCharacter;
  };
};
export default function CharacterGenerationScreen(): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<CharacterGenerationProps>>();
  // const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'CharacterGeneration'>>();
  // navigation으로 받아온 param
  // 수정하는 거니?
  const isModifying = route.params?.isModifying;
  // 수정할 캐릭터 객체
  const characterInfo = route.params?.characterInfo;

  // hooks
  const [, setCharacter] = useCharacter();
  const [, loadCharacterList] = useLoadCharacter();

  // 화면 몇 단계인지 나타내는 state
  const [step, setStep] = useState(1);
  // 생성/수정할 캐릭터 객체
  const [newCharacter, setNewCharacter] = useState(
    isModifying ? characterInfo : noMyCharacter,
  );

  // 백핸들러 처리
  const backAction = () => {
    if (step !== 1) setStep(step - 1);
    else navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });

  const storeNotificationCount = async (
    key: string,
    value: number,
  ): Promise<void> => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  };
  /**
   * 캐릭터 생성 or 수정 함수
   * * 단계3일 때 이용됨.
   */
  async function createNewCharacter() {
    // 입력한 이미지가 있는 경우
    if (newCharacter.profile_img) {
      const serverResult = await UploadImageAsync(newCharacter.profile_img);
      if (serverResult.isSuccess) {
        newCharacter.profile_img = serverResult.result;
      } else {
        alert(serverResult.result.errorMsg);
        // 못 가져왔으면 기본 이미지 대체
        newCharacter.profile_img =
          'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg';
      }
    } else {
      // 입력한 이미지 없으면 기본 이미지 대체
      newCharacter.profile_img =
        'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg';
    }

    let serverResult;
    if (isModifying) {
      serverResult = await editCharacterAsync(newCharacter);
    } else serverResult = await createCharacterAsync(newCharacter);
    if (serverResult.isSuccess) {
      if (serverResult.result !== null)
        await storeNotificationCount(`N${newCharacter.name}`, 0);
      setCharacter({
        ...newCharacter,
        id: serverResult.result,
      });
      await loadCharacterList();
      setStep(step + 1);
    } else {
      alert(serverResult.result.errorMsg);
    }
  }

  /**
   * 단계에 따른 화면 제목
   * @param stepNumber 현재 몇 번째 단계 화면
   * @returns
   */
  function setTitle(stepNumber: number) {
    if (stepNumber === 1) return i18n.t('어떤 모습인가요');
    if (stepNumber === 2) return i18n.t('이 캐릭터는 누구인가요');
    if (stepNumber === 3) return i18n.t('어떤 캐릭터인가요');
    return `${i18n.t('캐릭터 생성 완료')}!`;
  }
  /**
   * 단계에 따른 화면 제목
   * @param stepNumber 현재 몇 번째 단계 화면
   * @returns
   */
  function setSubtitle(stepNumber: number) {
    if (stepNumber === 1) return i18n.t('이 캐릭터의 겉모습을 생각해 보아요');
    if (stepNumber === 2)
      return i18n.t('이름, 직업 등 이 캐릭터의 기본 정보를 정해 보아요');
    if (stepNumber === 3) return i18n.t('캐릭터의 특징을 생각해 보아요');
    return undefined;
  }

  /**
   * 단계에 따른 화면
   * @param stepNumber 현재 몇 번째 단계 화면
   * @returns
   */
  function setCharacterGenerationScreen(stepNumber: number) {
    if (stepNumber === 1)
      return (
        <CharacterGenerationScreen1
          isModifying={isModifying}
          onPress={() => setStep(step + 1)}
          newCharacter={newCharacter}
          setNewCharacter={setNewCharacter}
        />
      );
    if (stepNumber === 2)
      return (
        <CharacterGenerationScreen2
          isModifying={isModifying}
          onPress={() => setStep(step + 1)}
          newCharacter={newCharacter}
          setNewCharacter={setNewCharacter}
          originCharacter={characterInfo}
        />
      );
    if (stepNumber === 3)
      return (
        <CharacterGenerationScreen3
          isModifying={isModifying}
          onPress={() => createNewCharacter()}
          newCharacter={newCharacter}
          setNewCharacter={setNewCharacter}
        />
      );
    return (
      <CharacterGenerationScreen4
        profileImg={newCharacter.profile_img}
        name={newCharacter.name}
        isModifying={isModifying}
        navigation={navigation}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <ProgressItem
            stepBack={() => setStep(step - 1)}
            step={step}
            maxLength={100}
            lastStep={4}
            title={setTitle(step)}
            subtitle={setSubtitle(step)}
            navigation={navigation}
          />
        </View>
        {setCharacterGenerationScreen(step)}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
