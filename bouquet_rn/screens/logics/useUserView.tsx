import { useRecoilState, useRecoilValueLoadable, Loadable, SetterOrUpdater } from 'recoil';
import { useMemo } from 'react';
import { viewUserState, viewUserSelector } from './atoms';
import useUser from './useUser';
import { User } from '../../utils/types';

export default function useUserView() {
  const [viewUserName, setViewUserName] = useRecoilState(viewUserState);
  const viewUser = useRecoilValueLoadable(viewUserSelector);
  const [user, setUser] = useUser();
  const isMe = useMemo(() => viewUserName.name === user.name, [viewUserName, user]);
  const realViewUser = useMemo(() => 
    viewUser.state === "hasValue" ?
    viewUser.contents :
    {
      name: '',
      profileImg: '',
      characters: []
    }
  , [viewUser]);

  type OutputType = [
    {characters: any, name: string, profileImg: string},
    SetterOrUpdater<{name: string, profileImg: string}>,
    boolean
  ]

  const returns: OutputType = [realViewUser, setViewUserName, isMe];

  return returns;
}