import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';
import { Character } from '../../utils/types';

export type CharacterResponseType = {
  id: number;
  name: string;
  profile_img: string;
  birth: number;
  job: string;
  nationality: string;
  intro: string;
  tmi: string;
  likes: Array<string>;
  hates: Array<string>;
}

export function responseToCharacter(response: CharacterResponseType, id: number) {
  const newObj: Character = {
    id: response.id ? response.id : id,
    name: response.name,
    profileImg: response.profile_img,
    birth: response.birth,
    job: response.job,
    nationality: response.nationality,
    intro: response.intro,
    tmi: response.tmi,
    likes: response.likes,
    hates: response.hates
  }

  return newObj;
}

export async function getCharacterListAsync() {
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let response = await fetch(serverAddress + "/user/character/all", {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': auth
        }
      });
      let result = await response.json();
      console.log(result);
  
      if (response.status === 200) {
        return result;
      }
      else return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
    }
    catch (err) {
      console.log("error: " + err);
      return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  else return "로그인되어 있지 않아요.";
}

export async function getCharacterAsync(characterId: number) {
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let response = await fetch(serverAddress + "/user/character", {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': auth,
          'character-id': `${characterId}`
        }
      });
      let result = await response.json();
      console.log(result);
  
      if (response.status === 200) {
        return result;
      }
      else return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
    }
    catch (err) {
      console.log("error: " + err);
      return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  else return "로그인되어 있지 않아요.";
}