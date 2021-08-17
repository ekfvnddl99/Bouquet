import { useEffect } from 'react';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import * as SecureStore from 'expo-secure-store';

import { Character } from '../../utils/types';
import { characterState, characterListState } from './atoms';
import { getCharacterAsync, getCharacterListAsync,
  responseToCharacter, CharacterResponseType } from './Character';
import useUser from './useUser';

export async function setCharacterListAsync(setter: SetterOrUpdater<Character[]>) {
  let list = [];
  const result = await getCharacterListAsync();
  if (typeof(result) !== "string") {
    list = result.map((obj: CharacterResponseType) => {
      return responseToCharacter(obj, obj.id);
    });
  }
  setter(list);
}

export default function useCharacter() {
  const [character, setCharacter] = useRecoilState(characterState);
  const [characterList, setCharacterList] = useRecoilState(characterListState);
  const [user, setUser] = useUser();

  useEffect(() => {
    const init = async () => {
      if (characterList.length === 0) {
        await setCharacterListAsync(setCharacterList);
      }

      if (character.id === -1) {
        const lastCharacterId = await SecureStore.getItemAsync('lastCharacterId');
        if (lastCharacterId) {
          const lastCharacter = await getCharacterAsync(Number(lastCharacterId));
          if (typeof(lastCharacter) !== "string") {
            setCharacter(responseToCharacter(lastCharacter, Number(lastCharacterId)));
          }
          else if (characterList.length > 0) {
            setCharacter(characterList[0]);
          }
        }
        else if (characterList.length > 0) {
          setCharacter(characterList[0]);
        }
      }
    }

    if (user.isLogined && characterList.length === 0) init();
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