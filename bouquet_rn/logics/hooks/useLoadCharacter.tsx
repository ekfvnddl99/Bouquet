import { useRecoilValue } from 'recoil';
import * as SecureStore from 'expo-secure-store';

// logics
import { characterListState } from '../atoms';
import useCharacter from './useCharacter';

/**
 * 캐릭터 정보를 불러오고 전역에 반영하는 함수를 제공하는 custom hook
 * @returns [캐릭터 새로고침 함수, 캐릭터 리스트 새로고침 함수]
 * * const [loadCharacter, loadCharacterList] = useLoadCharacter()와 같이 사용
 */
export default function useLoadCharacter(): () => Promise<void> {
  const [, setCharacter] = useCharacter();
  const characterList = useRecoilValue(characterListState);

  /**
   * 캐릭터를 선택하는 함수
   * @description 캐릭터 리스트에서 마지막으로 선택한 캐릭터를 선택 / 마지막으로 선택한 캐릭터 정보가 없으면 첫번째 캐릭터 선택
   */
  async function loadCharacter() {
    // 마지막으로 선택한 캐릭터 이름 정보가 있는지 확인
    const lastCharacterName = await SecureStore.getItemAsync(
      'lastCharacterName',
    );

    if (lastCharacterName) {
      // 마지막으로 선택한 캐릭터를 캐릭터 리스트에서 찾아 선택
      if (characterList.length > 0) {
        let tmpCharacter = characterList[0];
        for (let i = 0; i < characterList.length; i += 1) {
          if (characterList[i].name === lastCharacterName) {
            tmpCharacter = characterList[i];
            break;
          }
        }
        await setCharacter(tmpCharacter);
      }
    } else if (characterList.length > 0) {
      // 마지막으로 선택한 캐릭터 정보가 없으면 첫번째 선택
      await setCharacter(characterList[0]);
    }
    // 캐릭터 리스트가 비어 있으면 캐릭터 선택되지 않음
  }

  // TODO: loadCharacterList도 만들어야 함

  return loadCharacter;
}
