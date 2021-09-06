import * as SecureStore from 'expo-secure-store';

// logics
import { serverAddress } from './ServerInfos';

/**
 * ------------------------------------------------------------
 * * 서버 요청 관련 type들
 * ------------------------------------------------------------
 */

/**
 * 서버 요청 에러 정보를 담는 객체 Type (Front에서 사용하는 용도)
 * @property statusCode : response status code
 * @property msg : error를 설명하는 메시지
 * @property info : (optional) error 관련 정보를 다양하게 담는 property
 * ! info는 에러 정보 확인(출력) 용도로만 사용
 */
export type ServerErrorOutput = {
  statusCode: number;
  errorMsg: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  info?: any;
};

/**
 * 서버의 에러 객체 Type (서버 요청을 그대로 담는 용도)
 * @description 422(Validation Error) 제외
 * @property msg : 에러 내용을 담은 문자열
 */
export type ServerError = {
  msg: string;
};

/**
 * 서버의 에러 객체 Type (422: Validation Error) (서버 요청을 그대로 담는 용도)
 * @property detail : 에러 내용을 담은 객체
 */
export type ServerError422 = {
  detail: Array<{
    loc: Array<string>;
    msg: string;
    type: string;
  }>;
};

/**
 * 서버 요청 함수들의 반환 Type
 * @returns 요청이 이루어졌으면 [결과, Response 객체], 다른 문제(auth 정보 없음, 서버 연결 실패 등)가 발생했으면 에러 객체
 */
type ServerOutput<Result> = Promise<
  [Result | ServerError | ServerError422, Response] | ServerErrorOutput
>;

/**
 * 서버 요청 result가 ServerErrorOutput인지를 결정하는 Type Guard 함수
 * @description 미리 가공된 에러인지 확인하는 용도
 * @param arg Type을 결정할 result
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export function isServerErrorOutput(arg: any): arg is ServerErrorOutput {
  return arg.statusCode !== undefined && arg.errorMsg !== undefined;
}

/**
 * 서버 요청이 성공인지의 여부에 따라 Type을 결정하는 Type Guard 함수
 * @param arg Type을 결정할 result
 * @param response Response 객체
 *
 * @description 성공한 서버 요청(response.ok)이면 해당 요청의 result(arg)는 타입 T
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export function isSuccess<T>(arg: any, response: Response): arg is T {
  return response.ok;
}

/**
 * 주어진 Response가 어떤 오류인지에 따라 Type을 결정하는 Type Guard 함수
 * @param arg Type을 결정할 result
 * @param response Response 객체
 * @param statusCode 체크하고 싶은 오류의 status code
 *
 * @description response.status === statusCode이면 해당 요청의 result(arg)는 타입 T
 */
export function isError<T>(
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  arg: any,
  response: Response,
  statusCode: number,
): arg is T {
  return response.status === statusCode;
}

/**
 * 기본 서버 요청 함수를 이용한 여러 API 요청 함수들의 output type
 * @description T는 요청이 성공했을 때의 응답 type
 * @description 2번째 boolean은 요청 성공 여부 (true면 성공)
 * @description const [result, isSuccess] = 함수 형태로 사용
 */
export type ServerResult<T> = Promise<[T | ServerErrorOutput, boolean]>;

/**
 * ------------------------------------------------------------
 * * 서버 요청 함수들
 * ------------------------------------------------------------
 */

/**
 * GET
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 * @param info (optional) header 객체 (Content-Type과 accept 제외)
 *
 * @returns [요청 결과, Response] 또는 에러 객체
 * ! 사용할 때 isServerErrorOutput으로 ServerErrorOutput인지 검사(Type Guard) 필요
 *
 * @description Result는 요청이 성공할 때의 Output Type
 * @description Errors는 요청이 실패할 때의 Output Type들의 Union Type
 */
export async function getAsync<Result>(
  route: string,
  isAuth: boolean,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  info?: Record<string, any>,
): ServerOutput<Result> {
  // 요청 header 설정
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let header: Record<string, any> = {
    ...info,
    'Content-Type': 'application/json',
    accept: 'application/json',
  };
  // Authorization이 필요한 경우 SecureStore에서 auth 정보를 불러옴
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        Authorization: auth,
      };
    } else {
      // 로그인되어 있지 않은 경우(= auth 정보가 없는 경우) ServerErrorOutput 타입의 객체 반환
      return {
        statusCode: 401,
        errorMsg: '로그인되어 있지 않아요.',
      };
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'GET',
      headers: header,
    });
    const result = await response.json();
    return [result, response];
  } catch (err) {
    // fetch가 실패한 경우(= 서버 연결에 실패한 경우) ServerErrorOutput 타입의 객체 반환
    return {
      statusCode: -1,
      errorMsg: '서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
      info: err,
    };
  }
}

/**
 * POST
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param info header 객체 (accept 제외)
 * ! 반드시 Content-Type을 info에 넣어줄 것
 * @param body stringify된 객체 혹은 FormData body
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 *
 * @returns [요청 결과, Response] 또는 에러 객체
 * ! 사용할 때 isServerErrorOutput으로 ServerErrorOutput인지 검사(Type Guard) 필요
 *
 * @description Result는 요청이 성공할 때의 Output Type
 * @description Errors는 요청이 실패할 때의 Output Type들의 Union Type
 */
export async function postAsync<Result>(
  route: string,
  info: Record<string, string>,
  body: string | FormData,
  isAuth: boolean,
): ServerOutput<Result> {
  // 요청 header 설정
  let header: Record<string, string> = {
    ...info,
    accept: 'application/json',
  };
  // Authorization이 필요한 경우 SecureStore에서 auth 정보를 불러옴
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        Authorization: auth,
      };
    } else {
      // 로그인되어 있지 않은 경우(= auth 정보가 없는 경우) ServerErrorOutput 타입의 객체 반환
      return {
        statusCode: 401,
        errorMsg: '로그인되어 있지 않아요.',
      };
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'POST',
      headers: header,
      body,
    });
    const result = await response.json();

    return [result, response];
  } catch (err) {
    // fetch가 실패한 경우(= 서버 연결에 실패한 경우) ServerErrorOutput 타입의 객체 반환
    return {
      statusCode: -1,
      errorMsg: '서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
      info: err,
    };
  }
}

/**
 * PUT
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param body stringify된 객체 body
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 *
 * @returns [요청 결과, Response] 또는 에러 객체
 * ! 사용할 때 isServerErrorOutput으로 ServerErrorOutput인지 검사(Type Guard) 필요
 *
 * @description Result는 요청이 성공할 때의 Output Type
 * @description Errors는 요청이 실패할 때의 Output Type들의 Union Type
 */
export async function putAsync<Result>(
  route: string,
  body: string,
  isAuth: boolean,
): ServerOutput<Result> {
  // 요청 header 설정
  let header: Record<string, string> = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // Authorization이 필요한 경우 SecureStore에서 auth 정보를 불러옴
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        Authorization: auth,
      };
    } else {
      // 로그인되어 있지 않은 경우(= auth 정보가 없는 경우) ServerErrorOutput 타입의 객체 반환
      return {
        statusCode: 401,
        errorMsg: '로그인되어 있지 않아요.',
      };
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'PUT',
      headers: header,
      body,
    });
    const result = await response.json();

    return [result, response];
  } catch (err) {
    // fetch가 실패한 경우(= 서버 연결에 실패한 경우) ServerErrorOutput 타입의 객체 반환
    return {
      statusCode: -1,
      errorMsg: '서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
      info: err,
    };
  }
}

/**
 * DELETE
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 * @param info (optional) header 객체 (accept, Content-Type 제외)
 *
 * @returns [요청 결과, Response] 또는 에러 객체
 * ! 사용할 때 isServerErrorOutput으로 ServerErrorOutput인지 검사(Type Guard) 필요
 *
 * @description Result는 요청이 성공할 때의 Output Type
 * @description Errors는 요청이 실패할 때의 Output Type들의 Union Type
 */
export async function deleteAsync<Result>(
  route: string,
  isAuth: boolean,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  info?: Record<string, any>,
): ServerOutput<Result> {
  // 요청 header 설정
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let header: Record<string, any> = {
    ...info,
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // Authorization이 필요한 경우 SecureStore에서 auth 정보를 불러옴
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        Authorization: auth,
      };
    } else {
      // 로그인되어 있지 않은 경우(= auth 정보가 없는 경우) ServerErrorOutput 타입의 객체 반환
      return {
        statusCode: 401,
        errorMsg: '로그인되어 있지 않아요.',
      };
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'DELETE',
      headers: header,
    });
    const result = await response.json();

    return [result, response];
  } catch (err) {
    // fetch가 실패한 경우(= 서버 연결에 실패한 경우) ServerErrorOutput 타입의 객체 반환
    return {
      statusCode: -1,
      errorMsg: '서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
      info: err,
    };
  }
}

/**
 * PATCH
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param body stringify된 객체 body
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 * @param info (optional) header 객체 (accept, Content-Type 제외)
 *
 * @returns [요청 결과, Response] 또는 에러 객체
 * ! 사용할 때 isServerErrorOutput으로 ServerErrorOutput인지 검사(Type Guard) 필요
 *
 * @description Result는 요청이 성공할 때의 Output Type
 * @description Errors는 요청이 실패할 때의 Output Type들의 Union Type
 */
export async function patchAsync<Result>(
  route: string,
  body: string,
  isAuth: boolean,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  info?: Record<string, any>,
): ServerOutput<Result> {
  // 요청 header 설정
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let header: Record<string, any> = {
    ...info,
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // Authorization이 필요한 경우 SecureStore에서 auth 정보를 불러옴
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        Authorization: auth,
      };
    } else {
      // 로그인되어 있지 않은 경우(= auth 정보가 없는 경우) ServerErrorOutput 타입의 객체 반환
      return {
        statusCode: 401,
        errorMsg: '로그인되어 있지 않아요.',
      };
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'PATCH',
      headers: header,
      body,
    });
    const result = await response.json();

    return [result, response];
  } catch (err) {
    // fetch가 실패한 경우(= 서버 연결에 실패한 경우) ServerErrorOutput 타입의 객체 반환
    return {
      statusCode: -1,
      errorMsg: '서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.',
      info: err,
    };
  }
}
