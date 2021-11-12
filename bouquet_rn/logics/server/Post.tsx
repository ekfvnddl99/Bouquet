import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

// logics
import * as APIs from './APIUtils';

// utils
import {
  Post,
  PostRequest,
  PostCommentRequest,
  AllTemplates,
} from '../../utils/types/PostTypes';

/* eslint-disable camelcase */

/**
 * 서버에 게시글 업로드를 요청하는 함수
 * @param post 업로드하려는 게시글 정보
 *
 * @returns -{result: 게시글 id, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function uploadPostAsync(
  post: PostRequest<AllTemplates>,
): APIs.ServerResult<number> {
  // 서버 응답 타입 정의
  type UploadPostAsyncOutput = {
    id: number;
  };

  const tmpResult = await APIs.postAsync<UploadPostAsyncOutput>(
    '/post',
    { 'Content-Type': 'application/json' },
    JSON.stringify(post),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 게시글 id 반환
  if (APIs.isSuccess<UploadPostAsyncOutput>(result, response)) {
    return { result: result.id, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '입력한 정보가 잘못되었어요. 필수 정보를 다 입력했는지 확인해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 서버에 댓글 업로드를 요청하는 함수
 * @param comment 업로드하려는 댓글 정보
 *
 * @returns -{result: 댓글 id, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function uploadCommentAsync(
  comment: PostCommentRequest,
): APIs.ServerResult<number> {
  // 서버 응답 타입 정의
  type UploadCommentAsyncOutput = {
    id: number;
  };

  const tmpResult = await APIs.postAsync<UploadCommentAsyncOutput>(
    '/post/comment',
    { 'Content-Type': 'application/json' },
    JSON.stringify(comment),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 댓글 id 반환
  if (APIs.isSuccess<UploadCommentAsyncOutput>(result, response)) {
    return { result: result.id, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '입력한 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 서버에서 게시글 정보를 불러오는 함수
 * @param postId 불러오려는 게시글 id
 * @param characterId 게시글을 열람하는 캐릭터 id
 *
 * @returns -{result: Post, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getPostAsync(
  postId: number,
): APIs.ServerResult<Post<AllTemplates>> {
  // 서버 응답 타입 정의
  type GetPostAsyncOutput = Post<AllTemplates>;

  const auth = await SecureStore.getItemAsync('auth');

  const tmpResult = await APIs.getAsync<GetPostAsyncOutput>(
    `/post/${postId}`,
    false,
    auth ? { token: auth } : undefined,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Post 객체 반환
  if (APIs.isSuccess<GetPostAsyncOutput>(result, response)) {
    return { result, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '게시글이 지금은 없어요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

export async function deletePostAsync(postId: number): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type DeletePostAsyncOutput = null;

  const tmpResult = await APIs.deleteAsync<DeletePostAsyncOutput>(
    `/post?post_id=${postId}`,
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<DeletePostAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 서버에서 댓글을 삭제하는 함수
 * @param commentId 삭제할 댓글 아이디
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function deleteCommentAsync(
  commentId: number,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type DeleteCommentAsyncOutput = null;

  const tmpResult = await APIs.deleteAsync<DeleteCommentAsyncOutput>(
    `/post/comment/${commentId}`,
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<DeleteCommentAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 특정 캐릭터가 쓴 게시글 목록을 서버에서 불러오는 함수
 * @param pageNum 불러올 페이지
 * ! 페이지 번호는 1부터 시작
 * @param characterName 보고 싶은 대상 캐릭터의 이름
 *
 * @returns -{result: [Post 리스트, 전체 개수], isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getPostListAsync(
  pageNum: number,
  characterName: string,
): APIs.ServerResult<[Array<Post<AllTemplates>>, number]> {
  // 서버 응답 타입 정의
  type GetPostListAsyncOutput = {
    posts: Array<Post<AllTemplates>>;
    total_post_num: number;
  };

  const auth = await SecureStore.getItemAsync('auth');

  const tmpResult = await APIs.getAsync<GetPostListAsyncOutput>(
    `/post/character/${characterName}/${pageNum}`,
    false,
    auth ? { token: auth } : undefined,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Post List 반환
  if (APIs.isSuccess<GetPostListAsyncOutput>(result, response)) {
    return { result: [result.posts, result.total_post_num], isSuccess: true };
  }

  // 400 : Blocked
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg: '차단한 사용자에요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 게시글에 좋아요(햇빛) 요청을 보내는 함수
 * @param postId 좋아요(햇빛) 요청을 보내려는 대상 게시글의 id
 * @returns -{result: 좋아요 여부, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function likePostAsync(
  postId: number,
): APIs.ServerResult<boolean> {
  // 서버 응답 타입 정의
  type LikePostAsyncOutput = { msg: 'LIKE_SUCCESS' | 'UNLIKE_SUCCESS' };

  const tmpResult = await APIs.postAsync<LikePostAsyncOutput>(
    `/post/like/${postId}`,
    { 'Content-Type': 'application/json' },
    '',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 좋아요 여부 반환
  if (APIs.isSuccess<LikePostAsyncOutput>(result, response)) {
    return { result: result.msg === 'LIKE_SUCCESS', isSuccess: true };
  }

  // 404 : No such post
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg:
          '해당 게시글이 지금은 없어요. 재시작 후 다시 시도해 보거나, 문의해 주세요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '게시글 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

export async function getImagePickerPermission(): Promise<void> {
  const { status: existingStatus } =
    await ImagePicker.getMediaLibraryPermissionsAsync();
  let finalStatus = existingStatus;
  // 허락 안 받았으면 사용자에게 허락해달라고 요구
  if (existingStatus !== 'granted') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    finalStatus = status;
  }
  // 사용자가 허락 안 하면 불가
  if (finalStatus !== 'granted') {
    alert('이미지를 업로드하려면 권한이 필요해요.');
  }
}

/**
 * 댓글에 좋아요(햇빛) 요청을 보내는 함수
 * @param commentId 좋아요(햇빛) 요청을 보내려는 대상 댓글의 id
 * @returns -{result: 좋아요 여부, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function likeCommentAsync(
  commentId: number,
): APIs.ServerResult<boolean> {
  // 서버 응답 타입 정의
  type LikeCommentAsyncOutput = { msg: 'LIKE_SUCCESS' | 'UNLIKE_SUCCESS' };

  const tmpResult = await APIs.postAsync<LikeCommentAsyncOutput>(
    `/post/comment/like/${commentId}`,
    { 'Content-Type': 'application/json' },
    '',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 좋아요 여부 반환
  if (APIs.isSuccess<LikeCommentAsyncOutput>(result, response)) {
    return { result: result.msg === 'LIKE_SUCCESS', isSuccess: true };
  }

  // 404 : No such comment
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '해당 댓글이 지금은 없어요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '댓글 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 게시글을 신고하는 함수
 * @param postId 신고하려는 게시글 대상
 * @returns
 */
export async function reportPostAsync(postId: number): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type ReportPostAsyncOutput = null;

  const tmpResult = await APIs.postAsync<ReportPostAsyncOutput>(
    `/post/report/${postId}`,
    { 'Content-Type': 'application/json' },
    '',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 좋아요 여부 반환
  if (APIs.isSuccess<ReportPostAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 404 : No such comment
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '해당 게시글이 지금은 없어요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '댓글 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 댓글을 신고하는 함수
 * @param commentId 신고하려는 댓글 대상
 * @returns
 */
export async function reportCommentAsync(
  commentId: number,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type ReportCommentAsyncOutput = null;

  const tmpResult = await APIs.postAsync<ReportCommentAsyncOutput>(
    `/post/report/comment/${commentId}`,
    { 'Content-Type': 'application/json' },
    '',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 좋아요 여부 반환
  if (APIs.isSuccess<ReportCommentAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 404 : No such comment
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '해당 댓글이 지금은 없어요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '댓글 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 문장의 언어를 인지하는 함수
 * @param text 인지하려는 대상
 * @returns
 */
export async function recognizeLanguageAsync(
  text: string,
): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type recognizeLanguageAsyncOutput = {
    langCode: string;
  };

  let tmpResult;

  const header: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': 'QUJ66vtuHtwmkF8Dvz7u',
    'X-Naver-Client-Secret': 'qztf5Pb8BJ',
  };

  try {
    const response = await fetch(
      'https://openapi.naver.com/v1/papago/detectLangs',
      {
        method: 'POST',
        headers: header,
        body: `query=${text}`,
      },
    );

    let result: any;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    tmpResult = [result, response];
  } catch (err) {
    // fetch가 실패한 경우(= 서버 연결에 실패한 경우) ServerErrorOutput 타입의 객체 반환
    tmpResult = {
      statusCode: -1,
      errorMsg: '서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
      info: err,
    };
  }

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 좋아요 여부 반환
  if (APIs.isSuccess<recognizeLanguageAsyncOutput>(result, response)) {
    return { result: result.langCode, isSuccess: true };
  }

  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 문장을 번역하는 함수
 * @param text 번역하려는 대상
 * @returns
 */
export async function translateSentenceAsync(
  languageCode: string,
  text: string,
): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type translateSentenceAsyncOutput = {
    srcLangType: string;
    tarLangType: string;
    translatedText: string;
  };

  let tmpResult;

  const header: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': 'QUJ66vtuHtwmkF8Dvz7u',
    'X-Naver-Client-Secret': 'qztf5Pb8BJ',
  };

  try {
    const response = await fetch('https://openapi.naver.com/v1/papago/n2mt', {
      method: 'POST',
      headers: header,
      body: `source=${languageCode}&target=ko&text=${text}`,
    });

    let result: any;
    try {
      result = await response.json();
      result = result.message.result;
    } catch {
      result = null;
    }

    tmpResult = [result, response];
  } catch (err) {
    // fetch가 실패한 경우(= 서버 연결에 실패한 경우) ServerErrorOutput 타입의 객체 반환
    tmpResult = {
      statusCode: -1,
      errorMsg: '서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
      info: err,
    };
  }

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 좋아요 여부 반환
  if (APIs.isSuccess<translateSentenceAsyncOutput>(result, response)) {
    return { result: result.translatedText, isSuccess: true };
  }

  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}
