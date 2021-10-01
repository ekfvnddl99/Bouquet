import * as SecureStore from 'expo-secure-store';

import * as APIs from './APIUtils';

import { Post, AllTemplates } from '../../utils/types/PostTypes';

/* eslint-disable import/prefer-default-export */

/**
 * Home에 띄울 피드 게시글 리스트를 서버에서 불러오는 함수
 * @param pageNum 가져올 페이지 번호
 * @returns -{result: 게시글 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getFeedPostListAsync(
  pageNum: number,
): APIs.ServerResult<Array<Post<AllTemplates>>> {
  // 서버 응답 타입 정의
  type GetFeedPostListAsyncOutput = { posts: Array<Post<AllTemplates>> };

  const auth = await SecureStore.getItemAsync('auth');

  const tmpResult = await APIs.getAsync<GetFeedPostListAsyncOutput>(
    `/?page_num=${pageNum}`,
    false,
    auth ? { token: auth } : undefined,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 게시글 리스트 반환
  if (APIs.isSuccess<GetFeedPostListAsyncOutput>(result, response)) {
    return { result: result.posts, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg: '정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
