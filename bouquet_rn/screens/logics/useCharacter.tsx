import { useEffect } from 'react';
import { useRecoilState, SetterOrUpdater, useRecoilValueLoadable } from 'recoil';
import * as SecureStore from 'expo-secure-store';

import { Character } from '../../utils/types';
import { characterState, characterListSelector } from './atoms';
import { getCharacterAsync, responseToCharacter } from './Character';
import useUser from './useUser';

export default function useCharacter() {
  const [character, setCharacter] = useRecoilState(characterState);
  const characterList = useRecoilValueLoadable(characterListSelector);
  const [user, setUser] = useUser();

  useEffect(() => {
    const init = async () => {
      if (character.id === -1) {
        const lastCharacterId = await SecureStore.getItemAsync('lastCharacterId');
        if (lastCharacterId) {
          const lastCharacter = await getCharacterAsync(Number(lastCharacterId));
          if (typeof(lastCharacter) !== "string") {
            setCharacter(responseToCharacter(lastCharacter, Number(lastCharacterId)));
          }
          else if (characterList.state === 'hasValue' && characterList.contents.length > 0) {
            setCharacter(characterList.contents[0]);
          }
        }
        else if (characterList.state === 'hasValue' && characterList.contents.length > 0) {
          setCharacter(characterList.contents[0]);
        }
      }
    }

    if (user.isLogined) init();
  }, [user, characterList]);

  const setCharacterFunc = async (ch: Character) => {
    if (ch.id !== -1) await SecureStore.setItemAsync('lastCharacterId', String(ch.id));
    setCharacter(ch);
  }

  type OutputType = [
    Character,
    Function
  ];

  const returns: OutputType = [character, setCharacterFunc];
  return returns;
}