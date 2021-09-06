import * as APIs from './APIUtils';

// FormData의 append와 set을 overload
declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}

/**
 * 서버에 이미지를 업로드하는 함수
 * @param uri 업로드하려는 이미지의 uri
 *
 * @returns [이미지 링크, true] 또는 [에러 객체, false] : 2번째 boolean은 정보 불러오기 성공 여부
 */
export default async function uploadImageAsync(
  uri: string,
): APIs.ServerResult<string> {
  // 서버 응답 타입 정의
  type UploadImageAsyncOutput = {
    msg: string;
    url: string;
  };

  // 이미지의 확장자 결정
  let extension = '';
  for (let i = uri.length - 1; i >= 0; i -= 1) {
    if (uri.charAt(i) === '.') {
      extension = uri.slice(i, uri.length);
      break;
    }
  }

  // 이미지 확장자로부터 FormData의 type 결정
  let type = '';
  if (extension === '.jpg' || extension === '.jpeg') {
    type = 'image/jpeg';
  } else if (extension === '.png') {
    type = 'image/png';
  } else if (extension === '.gif') {
    type = 'image/gif';
  } else {
    return [
      {
        statusCode: -1,
        errorMsg: '지원하지 않는 형식이거나, 파일 이름이 잘못되었어요.',
      },
      false,
    ];
  }

  // 이미지를 담은 FormData 생성
  const formData = new FormData();
  formData.append('img', {
    type,
    uri,
    name: `upload${extension}`,
  });

  const tmpResult = await APIs.postAsync<UploadImageAsyncOutput>(
    '/img/upload',
    { 'Content-Type': 'multipart/form-data' },
    formData,
    true,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return [tmpResult, false];
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 이미지 url 반환
  if (APIs.isSuccess<UploadImageAsyncOutput>(result, response)) {
    return [result.url, true];
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return [
      {
        statusCode: 422,
        errorMsg:
          '이미지가 잘못되었어요. 바꿔서 다시 시도해 보거나, 문의해 주세요.',
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
