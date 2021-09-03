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
 * 캐릭터 객체 Type
 */
export type Character = {
  id?: number;
  name: string;
  profile_img: string;
  birth: number;
  job: string;
  nationality: string;
  intro: string;
  tmi: string;
  likes: Array<string>;
  hates: Array<string>;
};

/**
 * (서버 요청 용도) id를 제외하고 모든 것이 optional인 캐릭터 객체 Type
 */
export type OptionalCharacter = {
  id: number;
  name?: string;
  profile_img?: string;
  birth?: number;
  job?: string;
  nationality?: string;
  intro?: string;
  tmi?: string;
  likes?: Array<string>;
  hates?: Array<string>;
};
