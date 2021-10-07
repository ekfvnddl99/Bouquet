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
    name: string;
    profile_img: string;
  };
  liked: boolean;
  comments: Array<PostComment>;
};

/**
 * Post의 초기값
 */
export const noPost: Post<PlainTemplate> = {
  id: -1,
  created_at: '',
  updated_at: '',
  template: {
    type: 'None',
  },
  text: '',
  num_sunshines: 0,
  character_info: {
    name: '',
    profile_img: '',
  },
  liked: false,
  comments: [],
};

/**
 * (POST 요청용) 게시글 Type
 * @description T는 템플릿 Type을 나타냄
 */
export type PostRequest<T extends AllTemplates> = {
  character_id: number;
  text: string;
  template: T;
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
  children: Array<PostComment>;
};

/**
 * Comment의 초기값
 */
export const noComment: PostComment = {
  id: -1,
  created_at: '',
  updated_at: '',
  comment: '',
  parent: 0,
  deleted: false,
  num_sunshines: 0,
  character_info: {
    name: '',
    profile_img: '',
  },
  liked: false,
  children: [],
};

/**
 * (POST 요청용) 댓글 Type
 * @description 상위 댓글이 없는 경우 parent === 0
 */
export type PostCommentRequest = {
  post_id: number;
  character_id: number;
  comment: string;
  parent: number;
};

/**
 * Q&A Type
 */
export type Qna = {
  id: number;
  question: string;
  answer: string;
  num_sunshines: number;
  liked: boolean;
};

/**
 * (POST 요청용) Q&A Type
 */
export type QnaRequest = {
  question: string;
  answer: string;
};

export type Notification = {
  id: number;
  created_at: string;
  sender_name: string;
  sender_profile_img: string;
  category: string;
  post_id: number | null;
};

/**
 * ------------------------------------------------------------
 * * Templates
 * ------------------------------------------------------------
 */

export enum templates {
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
  date: string;
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

/**
 * 빈 템플릿을 반환하는 함수
 * * T에는 반환할 템플릿의 타입 기재
 * @param type 반환할 템플릿의 타입 문자열
 * ! T.type === type이어야 함
 */
export function noTemplate<T extends AllTemplates>(
  type: keyof typeof templates,
): T {
  /**
   * type 문자열로 템플릿 타입을 결정하는 Type Guard 함수
   * @param template 타입을 결정할 객체
   */
  function isTemplate<D extends AllTemplates>(
    template: AllTemplates,
  ): template is D {
    return template.type === type;
  }

  // PlainTemplate
  let result: AllTemplates = {
    type: 'None',
  };
  if (isTemplate<T>(result)) return result;

  // ImageTemplate
  result = {
    type: 'Image',
    img: '',
  };
  if (isTemplate<T>(result)) return result;

  // DiaryTemplate
  result = {
    type: 'Diary',
    title: '',
    weather: '',
    img: '',
    date: '',
    content: '',
  };
  if (isTemplate<T>(result)) return result;

  // AlbumTemplate
  result = {
    type: 'Album',
    description: '',
    title: '',
    img: '',
    artist: '',
    release_date: '',
    tracks: [{ title: '', lyric: '' }],
  };
  if (isTemplate<T>(result)) return result;

  // ListTemplate
  result = {
    type: 'List',
    title: '',
    content: '',
    img: '',
    components: [{ title: '', img: '', content: '' }],
  };
  if (isTemplate<T>(result)) return result;

  throw new Error('noTemplate(): wrong type parameter');
}
