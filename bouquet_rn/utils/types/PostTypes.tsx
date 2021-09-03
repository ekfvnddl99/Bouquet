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
  character_name: string;
  character_img: string;
  liked: boolean;
  type: keyof typeof templates;
  comments: Array<PostComment>;
};

/**
 * 게시글의 댓글 Type
 * @description 상위 댓글이 없는 경우 parent === 0
 * @description 하위 댓글이 없는 경우 children === undefined 또는 []
 */
export type PostComment = {
  name: string;
  profile_img: string;
  id: number;
  created_at: string;
  updated_at: string;
  comment: string;
  parent: number;
  deleted: boolean;
  num_sunshines: number;
  liked: boolean;
  children?: Array<PostComment>;
};

/**
 * ------------------------------------------------------------
 * * Templates
 * ------------------------------------------------------------
 */

/**
 * 모든 템플릿 리스트를 나타내는 enum
 */
export const enum templates {
  None,
  Image,
  Diary,
  Album,
  List,
}

/**
 * 모든 템플릿 type을 엮은 Union Type (템플릿이 없는 경우(빈 객체)도 포함)
 */
export type AllTemplates =
  | Record<string, never>
  | ImageTemplate
  | DiaryTemplate
  | AlbumTemplate
  | ListTemplate;

/**
 * "Image" 템플릿 Type
 */
export type ImageTemplate = {
  img: string;
};

/**
 * "Diary" 템플릿 Type
 */
export type DiaryTemplate = {
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
  description: string;
  title: string;
  img: string;
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
  title: string;
  content: string;
  img: string;
  components: Array<{
    title: string;
    img: string;
    content: string;
  }>;
};
