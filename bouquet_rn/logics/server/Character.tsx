// logics
import * as APIs from './APIUtils';

// utils
import {
  Character,
  MyCharacter,
  UserDetail,
  OptionalCharacter,
} from '../../utils/types/UserTypes';

/* eslint-disable camelcase */

/**
 * 서버에 캐릭터 생성 요청을 보내는 함수
 * @param character 만들 캐릭터 정보를 담은 Character 객체
 *
 * @returns -{result: 캐릭터 id, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function createCharacterAsync(
  character: MyCharacter,
): APIs.ServerResult<number> {
  // 서버 응답 타입 정의
  type CreateCharacterAsyncOutput = { id: number };

  const tmpResult = await APIs.postAsync<CreateCharacterAsyncOutput>(
    '/character',
    { 'Content-Type': 'application/json' },
    JSON.stringify(character),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 202 : Given character name already exists
  if (APIs.isError<APIs.ServerError>(result, response, 202)) {
    /**
     * 캐릭터 생성 과정에서 이름 중복을 체크함에도 불구하고 중복이어서 캐릭터 생성을 완료할 수 없는 경우이므로,
     * * status code가 200번대이지만 에러로 간주
     */
    return {
      result: {
        statusCode: 202,
        errorMsg:
          '이미 있는 캐릭터 이름이에요. 이름을 정하고 나서 생성을 누른 사이에 해당 캐릭터가 만들어졌나 봐요. 다른 이름으로 시도해 보세요!',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 요청 성공 : id 반환
  if (APIs.isSuccess<CreateCharacterAsyncOutput>(result, response)) {
    return { result: result.id, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '입력한 캐릭터 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
 * 서버에 캐릭터 정보 수정 요청을 보내는 함수
 * @param character 수정할 정보를 담은 OptionalCharacter 객체
 *
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function editCharacterAsync(
  character: OptionalCharacter,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type EditCharacterAsyncOutput = null;

  const tmpResult = await APIs.patchAsync<EditCharacterAsyncOutput>(
    '/character',
    JSON.stringify(character),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<EditCharacterAsyncOutput>(result, response)) {
    return { result, isSuccess: true };
  }

  // 400 : Given character doesn't belong to you
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg:
          '당신의 캐릭터가 아닌 것 같아요. 로그인 정보를 확인하고 다시 시도해 보거나, 문의해 주세요.',
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
          '입력한 캐릭터 수정 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
 * 한 유저의 캐릭터 목록을 서버에서 불러오는 함수
 * @param userName 유저의 이름. 이 유저의 캐릭터 목록을 불러옴
 *
 * @returns -{result: UserDetail, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getCharacterListAsync(
  userName: string,
): APIs.ServerResult<UserDetail> {
  // 서버 응답 타입 정의
  type GetCharacterListAsyncOutput = UserDetail;

  const tmpResult = await APIs.getAsync<GetCharacterListAsyncOutput>(
    `/character/user/${userName}`,
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : UserDetail 객체 반환
  if (APIs.isSuccess<GetCharacterListAsyncOutput>(result, response)) {
    return { result, isSuccess: true };
  }

  // 404 : No such user
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '찾으려는 유저가 지금은 없어요.',
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
 * 서버에서 캐릭터 정보를 불러오는 함수
 * @param characterName 정보를 불러오려는 캐릭터의 이름
 *
 * @returns -{result: Character, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getCharacterAsync(
  characterName: string,
): APIs.ServerResult<Character> {
  // 서버 응답 타입 정의
  type GetCharacterAsyncOutput = Character;

  const tmpResult = await APIs.getAsync<GetCharacterAsyncOutput>(
    `/character/${characterName}`,
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Character 객체 반환
  if (APIs.isSuccess<GetCharacterAsyncOutput>(result, response)) {
    return { result, isSuccess: true };
  }

  // 404 : No such character
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '찾으려는 캐릭터가 지금은 없어요.',
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
 * 서버에 캐릭터 삭제 요청을 보내는 함수
 * @param characterName 삭제하려는 캐릭터의 이름
 *
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function deleteCharacterAsync(
  characterName: string,
): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type DeleteCharacterAsyncOutput = null;

  const tmpResult = await APIs.deleteAsync<DeleteCharacterAsyncOutput>(
    `/character/${characterName}`,
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<DeleteCharacterAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 400 : Given character doesn't belong to you
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg:
          '당신의 캐릭터가 아닌 것 같아요. 로그인 정보를 확인하고 다시 시도해 보거나, 문의해 주세요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 404 : No such character
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '삭제하려는 캐릭터가 지금은 없어요.',
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
 * 어떤 캐릭터가 다른 캐릭터를 팔로우하도록 서버에 요청하는 함수
 * @param characterId 팔로우를 받는 캐릭터의 id
 * @param followerId 팔로우 요청을 보내는 캐릭터(=>로그인된 유저의 캐릭터)의 id
 *
 * @returns -{result: 팔로우 여부, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 * @description 팔로우 여부가 true이면 '팔로우하지 않은 상태 -> 팔로우한 상태'로 바뀐 것 /
 * false이면 '팔로우한 상태 -> 팔로우하지 않은 상태'로 바뀐 것
 */
export async function followCharacterAsync(
  characterId: number,
  followerId: number,
): APIs.ServerResult<boolean> {
  // 서버 응답 타입 정의
  type FollowCharacterAsyncOutput = {
    msg: 'FOLLOW_SUCCESS' | 'UNFOLLOW_SUCCESS';
  };

  const tmpResult = await APIs.postAsync<FollowCharacterAsyncOutput>(
    '/character/follow',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ character_id: characterId, follower_id: followerId }),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 팔로우 여부 반환
  if (APIs.isSuccess<FollowCharacterAsyncOutput>(result, response)) {
    return { result: result.msg === 'FOLLOW_SUCCESS', isSuccess: true };
  }

  // 400 : Given character doesn't belong to you
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg:
          '본인의 캐릭터가 잘못 지정된 것 같아요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 404 : No such character
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '팔로우 상태를 바꾸려는 캐릭터가 지금은 없어요.',
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
