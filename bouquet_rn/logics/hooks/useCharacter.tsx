import { useRecoilState } from 'recoil';
import * as SecureStore from 'expo-secure-store';

// logics
import { characterState } from '../atoms';
import { changeCharacterAsync } from '../server/Character';

// utils
import { MyCharacter } from '../../utils/types/UserTypes';

/**
 * 선택된 캐릭터 정보를 불러오고, 캐릭터 선택을 할 수 있는 custom hook
 * @returns [character, setCharacter]
 * * setCharacter가 async function임에 주의
 */
export default function useCharacter(): [
  MyCharacter,
  (ch: MyCharacter) => Promise<void>,
] {
  const [character, setCharacter] = useRecoilState(characterState);

  async function selectCharacter(ch: MyCharacter): Promise<void> {
    const changeResult = await changeCharacterAsync(ch.id);
    if (changeResult.isSuccess) {
      await SecureStore.setItemAsync('auth', changeResult.result);
    } else {
      alert(changeResult.result.errorMsg);
      return;
    }

    setCharacter(ch);
    // 마지막으로 선택한 캐릭터 이름을 로컬에 저장
    await SecureStore.setItemAsync('lastCharacterId', String(ch.id));
  }

  return [character, selectCharacter];
}
