import * as APIs from './APIUtils';

/**
 * 유저 이름이 중복되는지를 서버에서 확인하는 함수
 * @param userName 확인하려는 유저 이름
 *
 * @returns -{result: 중복 여부, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 * @description 중복 여부가 true이면 중복된 것, false이면 중복되지 않은 것
 */
export async function checkUserAsync(
  userName: string,
): APIs.ServerResult<boolean> {
  // 서버 응답 타입 정의
  type CheckUserAsyncOutput = {
    duplicated: boolean;
  };

  const tmpResult = await APIs.postAsync<CheckUserAsyncOutput>(
    '/auth/user/check',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ user_name: userName }),
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 중복 여부 반환
  if (APIs.isSuccess<CheckUserAsyncOutput>(result, response)) {
    return { result: result.duplicated, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '유저 이름이 잘못 입력되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
 * 캐릭터 이름이 중복되는지를 서버에서 확인하는 함수
 * @param characterName 확인하려는 캐릭터 이름
 *
 * @returns -{result: 중복 여부, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 * @description 중복 여부가 true이면 중복된 것, false이면 중복되지 않은 것
 */
export async function checkCharacterAsync(
  characterName: string,
): APIs.ServerResult<boolean> {
  // 서버 응답 타입 정의
  type CheckCharacterAsyncOutput = {
    duplicated: boolean;
  };

  const tmpResult = await APIs.postAsync<CheckCharacterAsyncOutput>(
    '/auth/character/check',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ character_name: characterName }),
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 중복 여부 반환
  if (APIs.isSuccess<CheckCharacterAsyncOutput>(result, response)) {
    return { result: result.duplicated, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '캐릭터 이름이 잘못 입력되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
 * 새 이메일에 대한 인증번호를 확인하는 함수
 * @param email 인증 받으려는 이메일
 *
 * @returns -{result: 인증 번호, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function checkNewEmailAsync(
  email: string,
): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type CheckNewEmailAsyncOutput = {
    verification_code: string;
  };

  const tmpResult = await APIs.postAsync<CheckNewEmailAsyncOutput>(
    '/auth/email',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ email }),
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 인증번호 반환
  if (APIs.isSuccess<CheckNewEmailAsyncOutput>(result, response)) {
    return { result: result.verification_code, isSuccess: true };
  }

  // 202 : Given email is already being used.
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg:
          '이미 존재하는 이메일이에요. 다시 시도해 보거나, 문의해 주세요.',
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
          '이메일이 잘못 입력되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
 * 기존 이메일에 대한 인증번호를 확인하는 함수
 * @param email 인증 받으려는 이메일
 *
 * @returns -{result: 인증 번호, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function checkExistingEmailAsync(
  email: string,
): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type CheckExistingEmailAsyncOutput = {
    verification_code: string;
  };

  const tmpResult = await APIs.postAsync<CheckExistingEmailAsyncOutput>(
    '/auth/user/email',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ email }),
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 인증번호 반환
  if (APIs.isSuccess<CheckExistingEmailAsyncOutput>(result, response)) {
    return { result: result.verification_code, isSuccess: true };
  }

  // 404 : Given email doesn't exist.
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg:
          '존재하지 않는 이메일이에요. 다시 시도해 보거나, 문의해 주세요.',
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
          '이메일이 잘못 입력되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
