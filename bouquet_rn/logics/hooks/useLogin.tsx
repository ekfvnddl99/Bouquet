import { useRecoilState } from 'recoil';
import * as SecureStore from 'expo-secure-store';

// logics
import { userState, characterListState, characterState } from '../atoms';
import { getUserAsync } from '../server/User';

/**
 * 계정 로그인, 로그아웃 함수를 제공하는 custom hook
 * * useLogin의 로그인은 'user state에 정보를 저장하는 것'을 말하며, SecureStore에 저장된 auth 키로 진행됨
 * @returns [login, logout]
 */
export default function useLogin(): [() => Promise<void>, () => Promise<void>] {
  const [, setUser] = useRecoilState(userState);
  const [, setCharacterList] = useRecoilState(characterListState);
  const [, setCharacter] = useRecoilState(characterState);

  async function login(): Promise<void> {
    const result = await getUserAsync();
    if (result.isSuccess) {
      setUser(result.result);
      // TODO: 캐릭터 리스트와 캐릭터 설정도 필요
    }
  }

  async function logout(): Promise<void> {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      await SecureStore.deleteItemAsync('auth');
    }
    // TODO: Toast로 로그아웃 알림 메시지 띄우기
    setUser(undefined);
    setCharacterList([]);
    setCharacter(undefined);
  }

  return [login, logout];
}
