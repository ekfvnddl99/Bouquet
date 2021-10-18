// logics
import * as APIs from './APIUtils';

// utils
import { User, MyCharacter } from '../../utils/types/UserTypes';

/**
 * 로그인 auth로 서버에서 유저 정보를 불러오는 함수
 * @returns -{result: User, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getUserAsync(): APIs.ServerResult<User> {
  // 서버 응답 타입 정의
  type GetUserAsyncOutput = User;

  const tmpResult = await APIs.getAsync<GetUserAsyncOutput>('/user', true);

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : User 객체 반환
  if (APIs.isSuccess<GetUserAsyncOutput>(result, response)) {
    return { result, isSuccess: true };
  }

  // 400 : Given user doesn't exist
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg:
          '로그인 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
 * 서버에서 유저 정보를 수정하는 함수
 * @param name 수정하려는 별명
 * @param profileImg 수정하려는 프로필 사진
 *
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function editUserAsync(
  name?: string,
  profileImg?: string,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type EditUserAsyncOutput = null;

  const tmpResult = await APIs.patchAsync<EditUserAsyncOutput>(
    '/user',
    JSON.stringify({ profile_img: profileImg, name }),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<EditUserAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
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

/**
 * 서버에서 유저를 삭제하는 함수
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function deleteUserAsync(): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type DeleteUserAsyncOutput = null;

  const tmpResult = await APIs.deleteAsync<DeleteUserAsyncOutput>(
    '/user',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<DeleteUserAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
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
 * 로그인된 계정의 캐릭터 목록을 불러오는 함수
 * @returns -{result: MyCharacter 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getMyCharacterListAsync(): APIs.ServerResult<
  Array<MyCharacter>
> {
  // 서버 응답 타입 정의
  type GetMyCharacterListAsyncOutput = {
    characters: Array<MyCharacter>;
  };

  const tmpResult = await APIs.getAsync<GetMyCharacterListAsyncOutput>(
    '/user/character',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : CharacterCarouselMini 리스트 반환
  if (APIs.isSuccess<GetMyCharacterListAsyncOutput>(result, response)) {
    return { result: result.characters, isSuccess: true };
  }

  // 404 : No such user
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '유저를 찾을 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
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

/**
 * 다른 계정을 차단하도록 요청하는 함수
 * @param userId 차단하려는 계정의 id
 * @returns null
 */
export async function blockUserAsync(userId: number): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type BlockUserAsyncOutput = null;

  const tmpResult = await APIs.postAsync<BlockUserAsyncOutput>(
    `/user/block`,
    { 'Content-Type': 'application/json' },
    JSON.stringify({ id: userId }),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : auth 반환
  if (APIs.isSuccess<BlockUserAsyncOutput>(result, response)) {
    return { result, isSuccess: true };
  }

  // 400 : You can't block yourself
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg: '내 계정을 차단할 수 없어요.',
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
          '요청한 계정 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
