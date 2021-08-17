import { serverAddress } from './ServerInfos';
import {Base64} from 'js-base64';

// 일부분은 EmailLogin에 있다.

// GET
export async function UserDupAsync(name: string) {
  try {
    let response = await fetch(serverAddress + "/auth/dup_user_name", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'user-name' : Base64.encode(name)
      },
    });
    let result = await response.json();

    if (response.status === 200) {
      return result.result;
    }
    else {
      return result.result;
    }
  }
  catch (err) {
    console.log("error: " + err);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}

export async function CharacterDupAsync(chaName: string) {
  try {
    let path = "/auth/dup_character_name";
    let header: {'accept': string, 'character-name': string}
    = {
      'accept': 'application/json',
      'character-name' : chaName
    };

    let response = await fetch(serverAddress + path, {
      method: 'GET',
      headers: header
    });
    let result = await response.json();

    if (response.status === 200) {
      return result.result;
    }
    else return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
  }
  catch (err) {
    console.log("error: " + err);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}