import { useRecoilValue } from 'recoil';

// logics
import { userState } from '../atoms';

// utils
import { User } from '../../utils/types/UserTypes';

/**
 * 로그인된 계정 정보를 불러오는 custom hook
 * @returns User
 */
export default function useUser(): User {
  const user = useRecoilValue(userState);

  return user;
}
