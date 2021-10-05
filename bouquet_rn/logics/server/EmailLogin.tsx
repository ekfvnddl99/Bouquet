import * as APIs from './APIUtils';

/**
 * 메일로 로그인 요청을 서버에 보내는 함수
 * @param email 로그인하려는 메일
 * @param password 로그인하려는 비밀번호
 *
 * @returns -{result: auth 키, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function loginEmailAsync(
  email: string,
  password: string,
): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type LoginEmailAsyncOutput = {
    Authorization: string;
  };

  const tmpResult = await APIs.postAsync<LoginEmailAsyncOutput>(
    '/auth/login/email',
    { 'Content-Type': 'application/json' },
    JSON.stringify({
      email,
      pw: password,
    }),
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : auth 키 반환
  if (APIs.isSuccess<LoginEmailAsyncOutput>(result, response)) {
    return { result: result.Authorization, isSuccess: true };
  }

  // 400 : Wrong ID or PW
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg: '메일이나 비밀번호가 틀렸나 봐요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 404 : Given SNS type is not supported
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
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
          '로그인 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
 * 메일로 계정 생성 요청을 서버에 보내는 함수
 * @param email 생성하려는 메일
 * @param password 생성하려는 비밀번호
 * @param name 생성하려는 계정 별명
 * @param profilePic 생성하려는 프로필 사진
 *
 * @returns -{result: auth 키, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function registerEmailAsync(
  email: string,
  password: string,
  name: string,
  profilePic: string,
): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type RegisterEmailAsyncOutput = {
    Authorization: string;
  };

  const tmpResult = await APIs.postAsync<RegisterEmailAsyncOutput>(
    '/auth/register/email',
    { 'Content-Type': 'application/json' },
    JSON.stringify({
      email,
      pw: password,
      profile_img: profilePic,
      name,
    }),
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 202 : Given E-mail already exists
  if (APIs.isError<APIs.ServerError>(result, response, 202)) {
    /**
     * 계정 생성 과정에서 이름 중복을 체크함에도 불구하고 중복이어서 계정 생성을 완료할 수 없는 경우이므로,
     * * status code가 200번대이지만 에러로 간주
     */
    return {
      result: {
        statusCode: 202,
        errorMsg:
          '이미 있는 이름이에요. 이름을 정하고 나서 생성을 누른 사이에 해당 계정이 만들어졌나 봐요. 다른 이름으로 시도해 보세요!',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 요청 성공 : auth 키 반환
  if (APIs.isSuccess<RegisterEmailAsyncOutput>(result, response)) {
    return { result: result.Authorization, isSuccess: true };
  }

  // 404 : Given SNS type is not supported
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
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
          '입력한 계정 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
 * 메일 주소의 중복 여부를 서버에서 불러오는 함수
 * @param email 확인하려는 메일 주소
 *
 * @returns -{result: 중복 여부, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 * @description 중복 여부가 true이면 중복, false이면 중복되지 않은 것
 */
export async function checkEmailAsync(
  email: string,
): APIs.ServerResult<boolean> {
  // 서버 응답 타입 정의
  type CheckEmailAsyncOutput = {
    duplicated: boolean;
  };

  const tmpResult = await APIs.postAsync<CheckEmailAsyncOutput>(
    '/auth/email/check',
    { 'Content-Type': 'application/json' },
    JSON.stringify({
      email,
    }),
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 중복 여부 반환
  if (APIs.isSuccess<CheckEmailAsyncOutput>(result, response)) {
    return { result: result.duplicated, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '입력한 이메일이 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
 * 서버에 비밀번호 변경 요청을 보내는 함수
 * @param email 본인 증명을 위한 이메일
 * @param pw 변경된 비밀번호
 *
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function editPasswordAsync(
  email: string,
  pw: string,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type EditPasswordAsyncOutput = null;

  const tmpResult = await APIs.patchAsync<EditPasswordAsyncOutput>(
    '/auth/user/change-pw',
    JSON.stringify({ email, pw }),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<EditPasswordAsyncOutput>(result, response)) {
    return { result, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '입력한 계정 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
