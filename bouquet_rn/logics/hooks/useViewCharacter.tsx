import { useRecoilState } from 'recoil';

// logics
import { viewCharacterState } from '../atoms';
import { getCharacterAsync } from '../server/Character';

// utils
import { Character } from '../../utils/types/UserTypes';

/**
 * Profile Detail에 띄울 캐릭터 정보를 불러오는 custom hook
 * @returns [viewCharacter, setViewCharacter]
 */
export default function useViewCharacter(): [
  Character,
  (characterName: string) => Promise<void>,
] {
  const [viewCharacter, setViewCharacter] = useRecoilState(viewCharacterState);

  async function setViewCharacterByName(characterName: string): Promise<void> {
    const result = await getCharacterAsync(characterName);
    if (result.isSuccess) {
      setViewCharacter(result.result);
    }
  }

  return [viewCharacter, setViewCharacterByName];
}
