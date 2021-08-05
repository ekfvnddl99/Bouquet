import { useEffect } from 'react';
import { useRecoilState, SetterOrUpdater, useRecoilValueLoadable } from 'recoil';

import { Character } from '../../utils/types';
import { characterState, characterListSelector } from './atoms';

export default function useCharacter() {
  const [character, setCharacter] = useRecoilState(characterState);
  const characterList = useRecoilValueLoadable(characterListSelector);

  useEffect(() => {
    // if (characterList.state === 'hasValue' && characterList.contents.length > 0 && character.id === -1) {
    //   setCharacter(characterList.contents[0]);
    // }
  }, [characterList]);

  type OutputType = [
    Character,
    SetterOrUpdater<Character>
  ];

  const returns: OutputType = [character, setCharacter];
  return returns;
}