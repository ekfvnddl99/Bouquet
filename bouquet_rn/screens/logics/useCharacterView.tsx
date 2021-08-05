import { useRecoilState, useRecoilValueLoadable, Loadable, SetterOrUpdater } from 'recoil';
import { viewCharacterIdState, viewCharacterSelector } from './atoms';
import { Character } from '../../utils/types';

export default function useCharacterView() {
  const [viewCharacterId, setViewCharacterId] = useRecoilState(viewCharacterIdState);
  const character = useRecoilValueLoadable(viewCharacterSelector);

  type OutputType = [
    Loadable<Character>,
    SetterOrUpdater<number>
  ]

  const returns: OutputType = [character, setViewCharacterId];

  return returns;
}