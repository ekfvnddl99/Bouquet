import * as SecureStore from 'expo-secure-store';
import { serverAddress } from './ServerInfos';

type ServerOutput = Promise< string | Record<string, unknown> >;
export type ResultOutput = Promise<unknown | string>;

/**
 * GET
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param info header 객체 (Content-Type과 accept 제외)
 */
export async function getAsync(route: string, info?: Record<string, string>): ServerOutput {
  const header = {
    ...info,
    'Content-Type': 'application/json',
    'accept': 'application/json'
  };
  try {
    const response = await fetch(serverAddress + route, {
      method: 'GET',
      headers: header,
    });
    const result = await response.json();

    if (response.status === 200) {
      return result;
    }
    return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
  }
  catch (err) {
    console.log(`error: ${err}`);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}

/**
 * POST
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param info header 객체 (accept 제외)
 * ! 반드시 Content-Type을 info에 넣어줄 것
 * @param body stringify된 객체 혹은 FormData body
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 */
export async function postAsync(route: string, info: Record<string, string>, body: string | FormData, isAuth: boolean): ServerOutput {
  let header: Record<string, string> = {
    ...info,
    'accept': 'application/json'
  };
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        'Authorization': auth
      };
    }
    else {
      return "로그인되어 있지 않아요.";
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'POST',
      headers: header,
      body
    });
    const result = await response.json();

    if (response.status === 200) {
      return result;
    }
    return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
  }
  catch (err) {
    console.log(`error: ${err}`);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}

/**
 * PUT
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param body stringify된 객체 body
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 */
export async function putAsync(route: string, body: string, isAuth: boolean): ServerOutput {
  let header: Record<string, string> = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        'Authorization': auth
      };
    }
    else {
      return "로그인되어 있지 않아요.";
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'PUT',
      headers: header,
      body
    });
    const result = await response.json();

    if (response.status === 200) {
      return result;
    }
    return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
  }
  catch (err) {
    console.log(`error: ${err}`);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}

/**
 * DELETE
 * @param route 연결할 API 주소 (ex: "/user/me")
 * @param isAuth Authorization이 필요한지 여부 (true면 필요함)
 * @param info header 객체 (accept, Content-Type 제외)
 */
export async function deleteAsync(route: string, isAuth: boolean, info?: Record<string, string>): ServerOutput {
  let header: Record<string, string> = {
    ...info,
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (isAuth) {
    const auth = await SecureStore.getItemAsync('auth');
    if (auth) {
      header = {
        ...header,
        'Authorization': auth
      };
    }
    else {
      return "로그인되어 있지 않아요.";
    }
  }

  try {
    const response = await fetch(serverAddress + route, {
      method: 'DELETE',
      headers: header,
    });
    const result = await response.json();

    if (response.status === 200) {
      return result;
    }
    return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
  }
  catch (err) {
    console.log(`error: ${err}`);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}
