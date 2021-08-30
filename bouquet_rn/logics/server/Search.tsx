import { serverAddress } from './ServerInfos';
import { Character } from '../utils/types';
import { characterState } from './atoms';
import * as SecureStore from 'expo-secure-store';

// GET
export async function SearchTopPost(chaID?: number, IsHome?:boolean) {
  try {
    const pageNum = await SecureStore.getItemAsync('tmpPageNum');
    let param : any={
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'page-num' : 1
      }
    }
    
    if(chaID) param.headers['character-id']=chaID;
    let address : string = IsHome ? "/" : "/search/top_posts/";
    console.log(param.headers)
    let response = await fetch(serverAddress + address, param);
    let result = await response.json();
    console.log("Search", result)

    if (response.status === 200) {
      return result;
    }
    else {
      return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  catch (err) {
    console.log("error: " + err);
    return "aaaaaaaa서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}

export async function SearchTopCharacter() {
  try {
    let param={
      method: 'GET',
      headers: {
        'accept': 'application/json',
      }
    }
    let response = await fetch(serverAddress + "/search/top_characters", param);
    let result = await response.json();

    console.log(result)

    if (response.status === 200) {
      return result;
    }
    else {
      return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  catch (err) {
    console.log("error: " + err);
    return "zzzzzzzzzz서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}