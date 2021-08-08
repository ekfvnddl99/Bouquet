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

export type CharacterRequestType = {
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

export function characterToRequest(character: Character) {
  const newObj: CharacterRequestType = {
    "name": character.name,
    "profile_img": character.profileImg,
    "birth": character.birth,
    "job": character.job,
    "nationality": character.nationality,
    "intro": character.intro,
    "tmi": character.tmi,
    "likes": character.likes,
    "hates": character.hates
  }

  return newObj;
}

// GET

export async function getCharacterListAsync(userName?: string) {
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let path = "/character";
      let header:
      {'accept': string, 'Authorization': string} |
      {'accept': string, 'Authorization': string, 'user-name': string}
      = {
        'accept': 'application/json',
        'Authorization': auth
      };

      if (userName) {
        path += "/another";
        header = {
          ...header,
          'user-name': userName
        };
      }
      else {
        path += "/me";
      }

      let response = await fetch(serverAddress + path + "/all", {
        method: 'GET',
        headers: header
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

export async function getCharacterAsync(characterId?: number, characterName?: string) {
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let path = "/character";
      let header:
      {'accept': string, 'Authorization': string, 'character-id': string} |
      {'accept': string, 'Authorization': string, 'character-name': string}
      = {
        'accept': 'application/json',
        'Authorization': auth,
        'character-id': ''
      };

      if (characterId) {
        path += "/me";
        header['character-id'] = `${characterId}`;
      }
      else if (characterName) {
        path += "/another";
        header = {
          'accept': header['accept'],
          'Authorization': header['Authorization'],
          'character-name': characterName
        }
      }

      let response = await fetch(serverAddress + path, {
        method: 'GET',
        headers: header
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

// POST

export async function createCharacterAsync(character: Character) {
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      console.log(JSON.stringify(characterToRequest(character)));
      let response = await fetch(serverAddress + "/character/me", {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(characterToRequest(character))
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