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
import { useRecoilState } from 'recoil';

// styles
import * as area from '../../styles/styled-components/area';

// logics
import type { ChaGenerationProps } from '../../utils/types/NavigationTypes';
import { characterListState } from '../../logics/atoms';
import {
  createCharacterAsync,
  editCharacterAsync,
} from '../../logics/server/Character';
import useCharacter from '../../logics/hooks/useCharacter';
import UploadImageAsync from '../../logics/server/UploadImage';

// components
import ProgressItem from '../../components/item/ProgressItem';

// screens
import CharacterGenerationScreen1 from './CharacterGenerationScreen1';
import CharacterGenerationScreen2 from './CharacterGenerationScreen2';
import CharacterGenerationScreen3 from './CharacterGenerationScreen3';
import CharacterGenerationScreen4 from './CharacterGenerationScreen4';

// utils
import { Character } from '../../utils/types/UserTypes';

type ParamList = {
  ProfileDetail: {
    isModifying: boolean;
  };
};
export default function CharacterGenerationScreen(): React.ReactElement {
  const [step, setStep] = useState(1);
  const navigation = useNavigation<StackNavigationProp<ChaGenerationProps>>();
  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();
  const isModifying = route.params?.isModifying;

  const [characterToCreate, setCharacterToCreate] = useState<Character>();
  const [character, setCharacter] = useCharacter();
  const [characterList, setCharacterList] = useRecoilState(characterListState);

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

  async function createCharacter() {
    const newCharacter = { ...characterToCreate };
    if (characterToCreate !== undefined && characterToCreate.profile_img) {
      const serverResult = await UploadImageAsync(
        characterToCreate.profile_img,
      );
      if (serverResult.isSuccess) {
        newCharacter.profile_img = serverResult.result;
      } else {
        alert(serverResult.result.errorMsg);
        newCharacter.profile_img =
          'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg';
      }
    } else {
      newCharacter.profile_img =
        'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg';
    }

    let func;
    if (isModifying) {
      func = editCharacterAsync;
    } else func = createCharacterAsync;

    const serverResult = await func(newCharacter);
    if (serverResult.isSuccess) {
      setCharacter({
        ...newCharacter,
        id: serverResult.result,
      });
      await setCharacterListAsync(setCharacterList);
      setStep(step + 1);
    } else {
      alert(serverResult.result.errorMsg);
    }
  }

  function setTitle(stepNumber: number) {
    if (stepNumber === 1) return i18n.t('어떤 모습인가요');
    if (stepNumber === 2) return i18n.t('이 캐릭터는 누구인가요');
    if (stepNumber === 3) return i18n.t('어떤 캐릭터인가요');
    return `${i18n.t('캐릭터 생성 완료')}!`;
  }

  function setSubtitle(stepNumber: number) {
    if (stepNumber === 1) return i18n.t('이 캐릭터의 겉모습을 생각해 보아요');
    if (stepNumber === 2)
      return i18n.t('이름, 직업 등 이 캐릭터의 기본 정보를 정해 보아요');
    if (stepNumber === 3) return i18n.t('캐릭터의 특징을 생각해 보아요');
    return undefined;
  }

  function setCharacterGenerationScreen(stepNumber: number) {
    if (stepNumber === 1)
      return (
        <CharacterGenerationScreen1
          isisModifyinging={isModifying}
          onChange={() => setStep(step + 1)}
          characterToCreate={characterToCreate}
          setCharacterToCreate={() => setCharacterToCreate}
        />
      );
    if (stepNumber === 2)
      return (
        <CharacterGenerationScreen2
          isisModifyinging={isModifying}
          onPress={() => setStep(step + 1)}
          characterToCreate={characterToCreate}
          setCharacterToCreate={setCharacterToCreate}
        />
      );
    if (stepNumber === 3)
      return (
        <CharacterGenerationScreen3
          isisModifyinging={isModifying}
          onPress={() => createCharacter}
          characterToCreate={characterToCreate}
          setCharacterToCreate={setCharacterToCreate}
        />
      );
    return (
      <CharacterGenerationScreen4
        profileImg={characterToCreate.profile_img}
        name={characterToCreate.name}
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
