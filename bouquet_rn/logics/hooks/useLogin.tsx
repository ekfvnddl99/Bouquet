import { useRecoilState } from 'recoil';
import * as SecureStore from 'expo-secure-store';

// logics
import { userState, characterState, characterListState } from '../atoms';
import { getUserAsync } from '../server/User';
import useLoadCharacter from './useLoadCharacter';

// utils
import { noUser, noMyCharacter } from '../../utils/types/UserTypes';

/**
 * 계정 로그인, 로그아웃 함수를 제공하는 custom hook
 * * useLogin의 로그인은 'user state에 정보를 저장하는 것'을 말하며, SecureStore에 저장된 auth 키로 진행됨
 * @returns [login, logout]
 */
export default function useLogin(): [() => Promise<void>, () => Promise<void>] {
  const [, setUser] = useRecoilState(userState);
  const [, setCharacter] = useRecoilState(characterState);
  const [, setCharacterList] = useRecoilState(characterListState);
  const [loadCharacter] = useLoadCharacter();

  async function login(): Promise<void> {
    const result = await getUserAsync();
    if (result.isSuccess) {
      setUser(result.result);
      await loadCharacter();
    }
  }

  async function logout(): Promise<void> {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      await SecureStore.deleteItemAsync('auth');
    }
    // TODO: Toast로 로그아웃 알림 메시지 띄우기
    setUser(noUser);
    setCharacterList([]);
    setCharacter(noMyCharacter);
  }

  return [login, logout];
}
