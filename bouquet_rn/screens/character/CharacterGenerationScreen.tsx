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
import {
  MyCharacter,
  noMyCharacter,
  Character,
} from '../../utils/types/UserTypes';

type ParamList = {
  ProfileDetail: {
    isModifying: boolean;
    characterInfo: MyCharacter;
  };
};
export default function CharacterGenerationScreen(): React.ReactElement {
  const [step, setStep] = useState(1);
  const navigation = useNavigation<StackNavigationProp<ChaGenerationProps>>();
  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();
  const isModifying = route.params?.isModifying;
  const characterInfo = route.params?.characterInfo;

  const [newCharacter, setNewCharacter] = useState(
    isModifying ? characterInfo : noMyCharacter,
  );
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

  async function createNewCharacter() {
    if (newCharacter.profile_img) {
      const serverResult = await UploadImageAsync(newCharacter.profile_img);
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

    const s = await editCharacterAsync(newCharacter);
    const serverResult = await createCharacterAsync(newCharacter);
    if (serverResult.isSuccess) {
      setCharacter({
        ...newCharacter,
        id: serverResult.result!,
      });
      setCharacterList({ ...characterList, character });
      // await setCharacterListAsync(setCharacterList);
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
          isModifying={isModifying}
          onPress={() => setStep(step + 1)}
          newCharacter={newCharacter}
          setNewCharacter={() => setNewCharacter}
        />
      );
    if (stepNumber === 2)
      return (
        <CharacterGenerationScreen2
          isModifying={isModifying}
          onPress={() => setStep(step + 1)}
          newCharacter={newCharacter}
          setNewCharacter={() => setNewCharacter}
        />
      );
    if (stepNumber === 3)
      return (
        <CharacterGenerationScreen3
          isModifying={isModifying}
          onPress={() => createNewCharacter}
          newCharacter={newCharacter}
          setNewCharacter={() => setNewCharacter}
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
