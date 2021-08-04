import { atom } from 'recoil';

import { User } from '../../utils/types';

export const guest: User = {
  isLogined: false,
  id: 0,
  email: '',
  name: '',
  profileImg: '',
  snsType: ''
}

export const userState = atom({
  key: 'userState',
  default: guest,
});