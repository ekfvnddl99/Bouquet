import { useEffect, useMemo, useCallback } from 'react';
import { User } from '../../utils/types';
import * as SecureStore from 'expo-secure-store';
import { serverAddress } from './ServerInfos';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { userState } from './atoms';

async function getUser(auth: string) {
  try {
    let response = await fetch(serverAddress + "/user/me", {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': auth
      }
    });
    let result = await response.json();
    console.log(result);
    
    if (response.status === 200) {
      return result.user;
    }
    else {
      return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  catch (err) {
    console.log("error: " + err);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}

export default function useUser() {
  const [user, setUser] = useRecoilState(userState);
  const getIsLogined = useCallback(() => user.isLogined, [user]);
  const isLogined = useMemo(() => getIsLogined(), [getIsLogined]);

  useEffect(() => {
    async function setUserFromAuth() {
      const auth = await SecureStore.getItemAsync('auth');
      if (auth) {
        const result = await getUser(auth);
        if (typeof(result) !== "string") {
          const tmpUser: User = {
            isLogined: true,
            id: result.id,
            email: result.email,
            name: result.name,
            profileImg: result.profile_img,
            snsType: result.sns_type
          }
          setUser(tmpUser);
        }
      }
    }

    if (!isLogined) {
      console.log("a");
      setUserFromAuth();
    }
  }, [isLogined]);

  type OutputType = [
    User,
    SetterOrUpdater<User>
  ];

  const returns: OutputType = [user, setUser];

  return returns;
}
