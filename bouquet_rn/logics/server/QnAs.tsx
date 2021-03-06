// logics
import * as APIs from './APIUtils';

// utils
import { Qna, QnaRequest } from '../../utils/types/PostTypes';

/* eslint-disable camelcase */

/**
 * Q&A 생성 요청을 보내는 함수
 * @param qna 생성하려는 Q&A 객체
 * @returns -{result: 생성된 Q&A의 id, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function createQnaAsync(
  qna: QnaRequest,
): APIs.ServerResult<number> {
  // 서버 응답 타입 정의
  type CreateQnaAsyncOutput = { id: number };

  const tmpResult = await APIs.postAsync<CreateQnaAsyncOutput>(
    '/qna',
    { 'Content-Type': 'application/json' },
    JSON.stringify(qna),
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Q&A id 반환
  if (APIs.isSuccess<CreateQnaAsyncOutput>(result, response)) {
    return { result: result.id, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '입력한 정보가 잘못되었어요. 수정해서 다시 시도해 보거나, 문의해 주세요.',
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
 * 특정 캐릭터가 작성한 Q&A 목록을 서버에서 불러오는 함수
 * @param characterName 보고 싶은 대상 캐릭터의 이름
 * @param pageNum 불러올 페이지
 * @returns -{result: Q&A 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getQnaListAsync(
  characterName: string,
  pageNum: number,
): APIs.ServerResult<Array<Qna>> {
  // 서버 응답 타입 정의
  type GetQnaListAsyncOutput = {
    character_name: string;
    profile_img: string;
    qnas: Array<Qna>;
  };

  const tmpResult = await APIs.getAsync<GetQnaListAsyncOutput>(
    `/qna/${characterName}`,
    false,
    { 'page-num': pageNum },
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Q&A 리스트 반환
  if (APIs.isSuccess<GetQnaListAsyncOutput>(result, response)) {
    return { result: result.qnas, isSuccess: true };
  }

  // 400 : Blocked
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg: '차단한 사용자에요.',
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
        errorMsg:
          '입력한 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
 * @returns -{result: 질문, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getQuestionAsync(): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type GetQuestionAsyncOutput = { question: string };

  const tmpResult = await APIs.getAsync<GetQuestionAsyncOutput>(
    `/qna/question/new`,
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Q&A 리스트 반환
  if (APIs.isSuccess<GetQuestionAsyncOutput>(result, response)) {
    return { result: result.question, isSuccess: true };
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
 * Q&A 삭제 요청을 보내는 함수
 * @param qnaId 삭제하려는 Q&A의 id
 * @returns -{result: null, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function deleteQnaAsync(qnaId: number): APIs.ServerResult<null> {
  // 서버 응답 타입 정의
  type DeleteQnaAsyncOutput = null;

  const tmpResult = await APIs.deleteAsync<DeleteQnaAsyncOutput>(
    `/qna?qna_id=${qnaId}`,
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : null 반환
  if (APIs.isSuccess<DeleteQnaAsyncOutput>(result, response)) {
    return { result: null, isSuccess: true };
  }

  // 400 : Not your Q&A
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg: '나의 Q&A만 지울 수 있어요.',
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
        errorMsg: 'Q&A 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
 * Q&A에 좋아요 요청을 보내는 함수
 * @param qnaId 좋아요 요청을 보내려는 대상 Q&A의 id
 * @returns -{result: 좋아요 여부, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function likeQnaAsync(qnaId: number): APIs.ServerResult<boolean> {
  // 서버 응답 타입 정의
  type LikeQnaAsyncOutput = { msg: 'LIKE_SUCCESS' | 'UNLIKE_SUCCESS' };

  const tmpResult = await APIs.postAsync<LikeQnaAsyncOutput>(
    `/qna/like/${qnaId}`,
    { 'Content-Type': 'application/json' },
    '',
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 좋아요 여부 반환
  if (APIs.isSuccess<LikeQnaAsyncOutput>(result, response)) {
    return { result: result.msg === 'LIKE_SUCCESS', isSuccess: true };
  }

  // 400 : You should have character to like
  if (APIs.isError<APIs.ServerError>(result, response, 400)) {
    return {
      result: {
        statusCode: 400,
        errorMsg:
          '선택된 캐릭터가 없어요. 캐릭터를 선택하고 다시 시도해 보거나, 문의해 주세요.',
        info: result.msg,
      },
      isSuccess: false,
    };
  }

  // 404 : No such Q&A
  if (APIs.isError<APIs.ServerError>(result, response, 404)) {
    return {
      result: {
        statusCode: 404,
        errorMsg: '해당 Q&A가 지금은 없어요.',
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
        errorMsg: 'Q&A 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
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
