import {
  useRecoilState,
  useRecoilValueLoadable,
  Loadable,
  SetterOrUpdater,
} from 'recoil';
import { viewCharacterState, viewCharacterSelector } from '../atoms';
import { Character } from '../utils/types';

export default function useCharacterView() {
  const [viewCharacter, setViewCharacter] = useRecoilState(viewCharacterState);
  const character = useRecoilValueLoadable(viewCharacterSelector);

  type OutputType = [Loadable<Character>, SetterOrUpdater<number | string>];

  const returns: OutputType = [character, setViewCharacter];

  return returns;
}
