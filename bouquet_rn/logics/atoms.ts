import { atom } from 'recoil';

// utils
import { Post, AllTemplates } from '../utils/types/PostTypes';
import { User, Character } from '../utils/types/UserTypes';

/**
 * 현재 로그인된 계정 정보를 담는 atom
 */
export const userState = atom({
  key: 'userState',
  default: <User | undefined>undefined,
});

/**
 * 현재 선택된 캐릭터 정보를 담는 atom
 */
export const characterState = atom({
  key: 'characterState',
  default: <Character | undefined>undefined,
});

/**
 * 현재 로그인된 계정이 지닌 캐릭터 목록을 담는 atom
 */
export const characterListState = atom({
  key: 'characterListState',
  default: <Array<Character>>[],
});

/**
 * Profile Detail에 띄울 유저 정보를 담는 atom
 */
export const viewUserState = atom({
  key: 'viewUserState',
  default: <User | undefined>undefined,
});

/**
 * Profile Detail에 띄울 캐릭터 정보를 담는 atom
 */
export const viewCharacterState = atom({
  key: 'viewCharacterState',
  default: <Character | undefined>undefined,
});

/**
 * Post Detail에 띄울 게시글 정보를 담는 atom
 */
export const viewPostState = atom({
  key: 'viewPostState',
  default: <Post<AllTemplates> | undefined>undefined,
});
