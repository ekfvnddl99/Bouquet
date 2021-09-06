import { useRecoilState } from 'recoil';
import * as SecureStore from 'expo-secure-store';

// logics
import { characterState } from '../atoms';

// utils
import { Character } from '../../utils/types/UserTypes';

/**
 * 선택된 캐릭터 정보를 불러오고, 캐릭터 선택을 할 수 있는 custom hook
 * @returns [character, setCharacter]
 */
export default function useCharacter(): [
  Character | undefined,
  (ch: Character) => Promise<void>,
] {
  const [character, setCharacter] = useRecoilState(characterState);

  async function selectCharacter(ch: Character): Promise<void> {
    setCharacter(ch);
    // 마지막으로 선택한 캐릭터 이름을 로컬에 저장
    await SecureStore.setItemAsync('lastCharacterName', ch.name);
  }

  return [character, selectCharacter];
}
