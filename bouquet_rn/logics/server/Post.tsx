// logics
import * as APIs from './APIUtils';

// utils
import {
  Post,
  PostRequest,
  PostCommentRequest,
  AllTemplates,
} from '../../utils/types/PostTypes';

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
  characterId?: number,
): APIs.ServerResult<Post<AllTemplates>> {
  // 서버 응답 타입 정의
  type GetPostAsyncOutput = Post<AllTemplates>;

  const tmpResult = await APIs.getAsync<GetPostAsyncOutput>(
    `/post/${postId}`,
    true,
    { 'character-id': characterId },
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
