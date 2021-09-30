import * as ImagePicker from 'expo-image-picker';

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
    false,
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
 * 인기 게시글 목록을 서버에서 불러오는 함수
 * @param pageNum 불러올 페이지
 * ! 페이지 번호는 1부터 시작
 * @param characterName 게시글 목록을 열람하려는 캐릭터 이름
 *
 * @returns -{result: Post 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getPostListAsync(
  pageNum: number,
  characterName: string,
): APIs.ServerResult<Array<Post<AllTemplates>>> {
  // 서버 응답 타입 정의
  type GetPostListAsyncOutput = Array<Post<AllTemplates>>;

  const tmpResult = await APIs.getAsync<GetPostListAsyncOutput>(
    `/post/character/${characterName}/${pageNum}`,
    false,
    { 'page-num': pageNum, 'character-name': characterName },
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Post List 반환
  if (APIs.isSuccess<GetPostListAsyncOutput>(result, response)) {
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
