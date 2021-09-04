/* eslint-disable camelcase */

/**
 * 게시글 Type
 * @description T는 템플릿 Type을 나타냄
 */
export type Post<T extends AllTemplates> = {
  id: number;
  created_at: string;
  updated_at: string;
  template: T;
  text: string;
  num_sunshines: number;
  character_info: {
    character_name: string;
    character_img: string;
  };
  liked: boolean;
  comments: Array<PostComment>;
};

/**
 * 게시글의 댓글 Type
 * @description 상위 댓글이 없는 경우 parent === 0
 * @description 하위 댓글이 없는 경우 children === undefined 또는 []
 */
export type PostComment = {
  id: number;
  created_at: string;
  updated_at: string;
  comment: string;
  parent: number;
  deleted: boolean;
  num_sunshines: number;
  character_info: {
    name: string;
    profile_img: string;
  };
  liked: boolean;
  children?: Array<PostComment>;
};

/**
 * ------------------------------------------------------------
 * * Templates
 * ------------------------------------------------------------
 */

/**
 * 모든 템플릿 type을 엮은 Union Type (템플릿이 없는 경우(빈 객체)도 포함)
 */
export type AllTemplates =
  | PlainTemplate
  | ImageTemplate
  | DiaryTemplate
  | AlbumTemplate
  | ListTemplate;

/**
 * 템플릿이 없는 경우의 Type
 */
export type PlainTemplate = {
  type: 'None';
};

/**
 * "Image" 템플릿 Type
 */
export type ImageTemplate = {
  type: 'Image';
  img: string;
};

/**
 * "Diary" 템플릿 Type
 */
export type DiaryTemplate = {
  type: 'Diary';
  title: string;
  weather: string;
  img: string;
  date: number;
  content: string;
};

/**
 * "Album" 템플릿 Type
 */
export type AlbumTemplate = {
  type: 'Album';
  description: string;
  title: string;
  img: string;
  artist: string;
  release_date: string;
  tracks: Array<{
    title: string;
    lyric: string;
  }>;
};

/**
 * "List" 템플릿 Type
 */
export type ListTemplate = {
  type: 'List';
  title: string;
  content: string;
  img: string;
  components: Array<{
    title: string;
    img: string;
    content: string;
  }>;
};
