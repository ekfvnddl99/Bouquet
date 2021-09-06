// logics
import * as APIs from './APIUtils';

// utils
import { CharacterMini } from '../../utils/types/UserTypes';
import { Post, AllTemplates } from '../../utils/types/PostTypes';

/**
 * 인기 캐릭터 목록을 서버에서 불러오는 함수
 * @returns [CharacterMini 리스트, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export async function getTopCharacterListAsync(): APIs.ServerResult<
  Array<CharacterMini>
> {
  // 서버 응답 타입 정의
  type GetTopCharacterListAsyncOutput = {
    characters: Array<CharacterMini>;
  };

  const tmpResult = await APIs.getAsync<GetTopCharacterListAsyncOutput>(
    '/search/top_characters',
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : CharacterMini List 반환
  if (APIs.isSuccess<GetTopCharacterListAsyncOutput>(result, response)) {
    return [result.characters, true];
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

/**
 * 인기 게시글 목록을 서버에서 불러오는 함수
 * @param pageNum 불러올 페이지
 * ! 페이지 번호는 1부터 시작
 * @param characterId 게시글 목록을 열람하려는 캐릭터 id
 *
 * @returns [Post 리스트, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export async function getTopPostListAsync(
  pageNum: number,
  characterId?: number,
): APIs.ServerResult<Array<Post<AllTemplates>>> {
  // 서버 응답 타입 정의
  type GetTopPostListAsyncOutput = {
    posts: Array<Post<AllTemplates>>;
  };

  const tmpResult = await APIs.getAsync<GetTopPostListAsyncOutput>(
    '/search/top_posts',
    false,
    { 'page-num': pageNum, 'character-id': characterId },
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Post List 반환
  if (APIs.isSuccess<GetTopPostListAsyncOutput>(result, response)) {
    return [result.posts, true];
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return [
      {
        statusCode: 422,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
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
