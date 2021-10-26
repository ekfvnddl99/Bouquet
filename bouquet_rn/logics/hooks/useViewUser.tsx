import { useRecoilState } from 'recoil';

// logics
import { viewUserState } from '../atoms';
import { getCharacterListAsync } from '../server/Character';

// utils
import { UserDetail } from '../../utils/types/UserTypes';

/**
 * Profile Detail에 띄울 유저 정보를 불러오는 custom hook
 * @returns [viewUser, setViewUser]
 */
export default function useViewUser(): [
  UserDetail,
  (userName: string) => Promise<void>,
] {
  const [viewUser, setViewUser] = useRecoilState(viewUserState);

  async function setViewUserByName(userName: string): Promise<void> {
    const result = await getCharacterListAsync(userName);
    if (result.isSuccess) {
      setViewUser(result.result);
    }
  }

  return [viewUser, setViewUserByName];
}
