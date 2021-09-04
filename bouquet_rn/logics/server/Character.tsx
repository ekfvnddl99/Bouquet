// logics
import * as APIs from './APIUtils';

// utils
import { Character, OptionalCharacter } from '../../utils/types/UserTypes';

/**
 * 서버에 캐릭터 생성 요청을 보내는 함수
 * @param character 만들 캐릭터 정보를 담은 Character 객체
 *
 * @returns [{ id: 캐릭터 id }, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export async function createCharacterAsync(
  character: Character,
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
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 202 : Given character name already exists
  if (APIs.isError<APIs.ServerError>(result, response, 202)) {
    /**
     * 캐릭터 생성 과정에서 이름 중복을 체크함에도 불구하고 중복이어서 캐릭터 생성을 완료할 수 없는 경우이므로,
     * * status code가 200번대이지만 에러로 간주
     */
    return [
      {
        statusCode: 202,
        errorMsg:
          '이미 있는 캐릭터 이름이에요. 이름을 정하고 나서 생성을 누른 사이에 해당 캐릭터가 만들어졌나 봐요. 다른 이름으로 시도해 보세요!',
        info: result.msg,
      },
      false,
    ];
  }

  // 요청 성공 : id 반환
  if (APIs.isSuccess<CreateCharacterAsyncOutput>(result, response)) {
    return [result.id, true];
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return [
      {
        statusCode: 422,
        errorMsg:
          '입력한 캐릭터 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
 * 서버에 캐릭터 정보 수정 요청을 보내는 함수
 * @param character 수정할 정보를 담은 OptionalCharacter 객체
 *
 * @returns [null, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
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
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<EditCharacterAsyncOutput>(result, response)) {
    return [result, true];
  }

  // 400 : Given character doesn't belong to you
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return [
      {
        statusCode: 400,
        errorMsg:
          '당신의 캐릭터가 아닌 것 같아요. 로그인 정보를 확인하고 다시 시도해 보거나, 문의해 주세요.',
        info: result.msg,
      },
      false,
    ];
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return [
      {
        statusCode: 422,
        errorMsg:
          '입력한 캐릭터 수정 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
 * 한 유저의 캐릭터 목록을 서버에서 불러오는 함수
 * @param userName 유저의 이름. 이 유저의 캐릭터 목록을 불러옴
 *
 * @returns [Array<Character>, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export async function getCharacterListAsync(
  userName: string,
): APIs.ServerResult<Array<Character>> {
  // 서버 응답 타입 정의
  type GetCharacterListAsyncOutput = {
    characters: Array<Character>;
  };

  const tmpResult = await APIs.getAsync<GetCharacterListAsyncOutput>(
    `/character/user/${userName}`,
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Array<Character> 반환
  if (APIs.isSuccess<GetCharacterListAsyncOutput>(result, response)) {
    return [result.characters, true];
  }

  // 404 : No such user
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return [
      {
        statusCode: 404,
        errorMsg: '찾으려는 유저가 지금은 없어요.',
        info: result.msg,
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
 * 서버에서 캐릭터 정보를 불러오는 함수
 * @param characterName 정보를 불러오려는 캐릭터의 이름
 *
 * @returns [Character 객체, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
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
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Character 객체 반환
  if (APIs.isSuccess<GetCharacterAsyncOutput>(result, response)) {
    return [result, true];
  }

  // 404 : No such character
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return [
      {
        statusCode: 404,
        errorMsg: '찾으려는 캐릭터가 지금은 없어요.',
        info: result.msg,
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
 * 서버에 캐릭터 삭제 요청을 보내는 함수
 * @param characterName 삭제하려는 캐릭터의 이름
 *
 * @returns [null, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
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
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<DeleteCharacterAsyncOutput>(result, response)) {
    return [null, true];
  }

  // 400 : Given character doesn't belong to you
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return [
      {
        statusCode: 400,
        errorMsg:
          '당신의 캐릭터가 아닌 것 같아요. 로그인 정보를 확인하고 다시 시도해 보거나, 문의해 주세요.',
        info: result.msg,
      },
      false,
    ];
  }

  // 404 : No such character
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return [
      {
        statusCode: 404,
        errorMsg: '삭제하려는 캐릭터가 지금은 없어요.',
        info: result.msg,
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
 * 어떤 캐릭터가 다른 캐릭터를 팔로우하도록 서버에 요청하는 함수
 * @param characterId 팔로우를 받는 캐릭터의 id
 * @param followerId 팔로우 요청을 보내는 캐릭터(=>로그인된 유저의 캐릭터)의 id
 *
 * @returns [팔로우 여부, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 * @description 팔로우 여부가 true이면 팔로우하지 않은 상태 -> 팔로우한 상태로 바뀐 것 / false이면 팔로우한 상태 -> 팔로우하지 않은 상태로 바뀐 것
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
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 팔로우 여부 반환
  if (APIs.isSuccess<FollowCharacterAsyncOutput>(result, response)) {
    return [result.msg === 'FOLLOW_SUCCESS', true];
  }

  // 400 : Given character doesn't belong to you
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return [
      {
        statusCode: 400,
        errorMsg:
          '본인의 캐릭터가 잘못 지정된 것 같아요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.msg,
      },
      false,
    ];
  }

  // 404 : No such character
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return [
      {
        statusCode: 404,
        errorMsg: '팔로우 상태를 바꾸려는 캐릭터가 지금은 없어요.',
        info: result.msg,
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
