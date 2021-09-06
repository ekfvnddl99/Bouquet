import * as APIs from './APIUtils';
import {
  Post,
  PostRequest,
  PostComment,
  PostCommentRequest,
  AllTemplates,
} from '../../utils/types/PostTypes';

/**
 * 서버에 게시글 업로드를 요청하는 함수
 * @param post 업로드하려는 게시글 정보
 *
 * @returns [게시글 id, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
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
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 게시글 id 반환
  if (APIs.isSuccess<UploadPostAsyncOutput>(result, response)) {
    return [result.id, true];
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return [
      {
        statusCode: 422,
        errorMsg:
          '입력한 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      false,
    ];
  }
  // 나머지 에러
  return [
    {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    false,
  ];
}

export async function uploadCommentAsync();
