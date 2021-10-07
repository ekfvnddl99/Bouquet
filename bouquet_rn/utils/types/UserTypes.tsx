/* eslint-disable camelcase */

/**
 * 유저 객체 Type
 */
export type User = {
  id: number;
  email: string;
  name: string;
  profile_img: string;
  sns_type: string;
};

/**
 * User의 초기값
 */
export const noUser: User = {
  id: -1,
  email: '',
  name: '',
  profile_img: '',
  sns_type: '',
};

/**
 * 유저의 Profile Detail을 위한 Type
 */
export type UserDetail = {
  user_info: {
    name: string;
    profile_img: string;
    num_followers: number;
    num_characters: number;
  };
  characters: Array<CharacterMini>;
};

/**
 * UserDetail의 초기값
 */
export const noUserDetail: UserDetail = {
  user_info: {
    name: '',
    profile_img: '',
    num_followers: 0,
    num_characters: 0,
  },
  characters: [],
};

/**
 * 캐릭터 객체 Type
 * * Profile Detail을 띄우거나(=남의 캐릭터 정보를 담거나), 캐릭터의 모든 정보를 담을 필요가 있을 때 사용
 */
export type Character = {
  id?: number;
  name: string;
  profile_img: string;
  birth: string;
  job: string;
  nationality: string;
  intro: string;
  tmi: string;
  likes: Array<string>;
  hates: Array<string>;
  num_follows: number;
  num_followers: number;
  user_info: {
    name: string;
    profile_img: string;
  };
  followed: boolean;
};

/**
 * Character의 초기값
 */
export const noCharacter: Character = {
  name: '',
  profile_img: '',
  birth: '',
  job: '',
  nationality: '',
  intro: '',
  tmi: '',
  likes: [],
  hates: [],
  num_follows: 0,
  num_followers: 0,
  user_info: {
    name: '',
    profile_img: '',
  },
  followed: false,
};

/**
 * 캐릭터 미리보기용 Type
 */
export type CharacterMini = {
  name: string;
  profile_img: string;
  intro: string;
};

/**
 * 자신의 캐릭터 정보를 담는 Type
 */
export type MyCharacter = {
  id: number;
  name: string;
  profile_img: string;
  birth: string;
  job: string;
  nationality: string;
  intro: string;
  tmi: string;
  likes: Array<string>;
  hates: Array<string>;
};

/**
 * MyCharacter의 초기값
 */
export const noMyCharacter: MyCharacter = {
  id: -1,
  name: '',
  profile_img: '',
  birth: '',
  job: '',
  nationality: '',
  intro: '',
  tmi: '',
  likes: [],
  hates: [],
};

/**
 * (서버 요청 용도) id를 제외하고 모든 것이 optional인 캐릭터 객체 Type
 */
export type OptionalCharacter = {
  id: number;
  name?: string;
  profile_img?: string;
  birth?: string;
  job?: string;
  nationality?: string;
  intro?: string;
  tmi?: string;
  likes?: Array<string>;
  hates?: Array<string>;
};
