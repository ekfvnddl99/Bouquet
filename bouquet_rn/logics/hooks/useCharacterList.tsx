import { useRecoilValue } from 'recoil';

// logics
import { characterListState } from '../atoms';

// utils
import { MyCharacter } from '../../utils/types/UserTypes';

/**
 * 로그인된 계정의 캐릭터 목록을 불러오는 custom hook
 * @returns MyCharacter 리스트
 */
export default function useCharacterList(): Array<MyCharacter> {
  const characterList = useRecoilValue(characterListState);

  return characterList;
}
