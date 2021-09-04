// logics
import * as APIs from './APIUtils';

// utils
import { User } from '../../utils/types/UserTypes';

/**
 * 로그인 auth로 서버에서 유저 정보를 불러오는 함수
 * @returns [User 객체, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export async function getUserAsync(): APIs.ServerResult<User> {
  // 서버 응답 타입 정의
  type GetUserAsyncOutput = User;

  const tmpResult = await APIs.getAsync<GetUserAsyncOutput>('/user/', true);

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : User 객체 반환
  if (APIs.isSuccess<GetUserAsyncOutput>(result, response)) {
    return [result, true];
  }

  // 400 : Given user doesn't exist
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return [
      {
        statusCode: 400,
        errorMsg:
          '로그인 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
      },
      false,
    ];
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

/**
 * 서버에서 유저 정보를 수정하는 함수
 * @param name 수정하려는 별명
 * @param profileImg 수정하려는 프로필 사진
 *
 * @returns [null, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export async function editUserAsync(
  name?: string,
  profileImg?: string,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type EditUserAsyncOutput = null;

  const tmpResult = await APIs.patchAsync<EditUserAsyncOutput>(
    '/user/',
    JSON.stringify({ profile_img: profileImg, name }),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<EditUserAsyncOutput>(result, response)) {
    return [null, true];
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return [
      {
        statusCode: 422,
        errorMsg: '정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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

/**
 * 서버에서 유저를 삭제하는 함수
 * @returns [null, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export async function deleteUserAsync(): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type DeleteUserAsyncOutput = null;

  const tmpResult = await APIs.deleteAsync<DeleteUserAsyncOutput>(
    'user/',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<DeleteUserAsyncOutput>(result, response)) {
    return [null, true];
  }

  // 에러
  return [
    {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    false,
  ];
}
