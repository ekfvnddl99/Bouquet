import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// logics
import { deleteCharacterAsync } from '../../logics/server/Character';
import useCharacter from '../../logics/hooks/useCharacter';
import useLoadCharacter from '../../logics/hooks/useLoadCharacter';

// components
import HeaderItem from '../../components/item/HeaderItem';

// screens
import ChaDeletionScreenOne from './CharacterDeletionScreen1';
import ChaDeletionScreenTwo from './CharacterDeletionScreen2';

export default function CharacterDeletionScreen(): React.ReactElement {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const [myCharacter] = useCharacter();
  const [, loadCharacterList] = useLoadCharacter();
  const myCharacterCopy = myCharacter;

  async function deleteCharacter() {
    const serverResult = await deleteCharacterAsync(myCharacter.name);
    if (serverResult.isSuccess) {
      setStep(step + 1);
      loadCharacterList();
    } else alert(serverResult.result.errorMsg);
  }

  function setTitle(stepNumber: number) {
    if (stepNumber === 1) return i18n.t('캐릭터 삭제');
    return i18n.t('캐릭터 삭제 완료');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container>
        <HeaderItem
          isAccount
          isBackButton={step === 1}
          name={myCharacter.name}
          profileImg={myCharacter.profile_img}
        />
        <area.ContainerBlank20>
          <text.Subtitle1 textColor={colors.black} style={{ marginBottom: 32 }}>
            {setTitle(step)}
          </text.Subtitle1>
          {step === 1 ? (
            <ChaDeletionScreenOne
              profileImg={myCharacter.profile_img}
              name={myCharacter.name}
              onPress={() => deleteCharacter}
            />
          ) : (
            <ChaDeletionScreenTwo
              profileImg={myCharacterCopy.profile_img}
              name={myCharacterCopy.name}
              navigation={navigation}
            />
          )}
        </area.ContainerBlank20>
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
