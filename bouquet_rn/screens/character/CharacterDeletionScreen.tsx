import React, { useState } from 'react';
import i18n from 'i18n-js';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Analytics from 'expo-firebase-analytics';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// logics
import { deleteCharacterAsync } from '../../logics/server/Character';
import useLoadCharacter from '../../logics/hooks/useLoadCharacter';
import useUser from '../../logics/hooks/useUser';
import useCharacter from '../../logics/hooks/useCharacter';

// utils
import { MyCharacter } from '../../utils/types/UserTypes';

// components
import HeaderItem from '../../components/item/HeaderItem';

// screens
import CharacterDeletionScreenOne from './CharacterDeletionScreen1';
import CharacterDeletionScreenTwo from './CharacterDeletionScreen2';

type ParamList = {
  ProfileDetail: {
    characterInfo: MyCharacter;
  };
};
export default function CharacterDeletionScreen(): React.ReactElement {
  const user = useUser();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();
  const targetCharacter = route.params?.characterInfo;

  const [, loadCharacterList] = useLoadCharacter();
  const [, setCharacter] = useCharacter();
  // 첫 번째 화면에서 삭제하고, 두 번째 화면에서 삭제한 캐릭터의 이미지와 이름을 보여줘야 하는데 음 제대로 될지 모르겠네

  // 화면 몇 단계인지 나타내는 state
  const [step, setStep] = useState(1);

  const deleteNotificationCount = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  };
  // 캐릭터 삭제 함수
  const [loading, setLoading] = useState(false);
  async function deleteCharacter() {
    if (loading) return;
    setLoading(true);

    const serverResult = await deleteCharacterAsync(targetCharacter.name);
    if (serverResult.isSuccess) {
      await deleteNotificationCount(`N${targetCharacter.name}`);
      await Analytics.logEvent('delete_character');
      setStep(step + 1);
      const chList = await loadCharacterList();
      if (chList && chList.length > 0) await setCharacter(chList[0]);
    } else alert(serverResult.result.errorMsg);
    setLoading(false);
  }

  /**
   * 단계에 따른 화면 제목
   * @param stepNumber 현재 몇 번째 단계 화면
   * @returns
   */
  function setTitle(stepNumber: number) {
    if (stepNumber === 1) return i18n.t('캐릭터 삭제');
    return i18n.t('캐릭터 삭제 완료');
  }

  return (
    <area.Container>
      <HeaderItem
        isAccount
        isBackButton={step === 1}
        name={user.name}
        profileImg={user.profile_img}
        routePrefix="ProfileTab"
      />
      <area.ContainerBlank20>
        <text.Subtitle1 textColor={colors.black} style={{ marginBottom: 32 }}>
          {setTitle(step)}
        </text.Subtitle1>
        {step === 1 ? (
          <CharacterDeletionScreenOne
            profileImg={targetCharacter.profile_img}
            name={targetCharacter.name}
            onPress={() => deleteCharacter()}
          />
        ) : (
          <CharacterDeletionScreenTwo
            profileImg={targetCharacter.profile_img}
            name={targetCharacter.name}
            navigation={navigation}
          />
        )}
      </area.ContainerBlank20>
    </area.Container>
  );
}
